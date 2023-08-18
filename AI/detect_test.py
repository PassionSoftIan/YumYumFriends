import torch
import argparse
from pathlib import Path
from models.experimental import attempt_load
from utils.dataloaders import LoadImages
from utils.general import non_max_suppression


def detect_classes(path, model, conf_thres=0.25, iou_thres=0.45):
    # Setup device
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    # Load data
    dataset = LoadImages(path, img_size=model.img_size)

    # Run inference
    results = []
    for _, img, _, _ in dataset:
        # Preprocess image
        img = torch.from_numpy(img).to(device)
        if img.ndimension() == 3:
            img = img.unsqueeze(0)

        # Object detection
        with torch.no_grad():
            pred = model(img, augment=False)[0]
            pred = non_max_suppression(pred, conf_thres, iou_thres, agnostic=False)

        # Extract classes and locations
        for det in pred:
            if det is not None and len(det):
                for *xyxy, conf, cls in det:
                    results.append({
                        'class': model.names[int(cls)],
                        'coordinates': [int(x) for x in xyxy]
                    })

    return results


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--weights', nargs='+', type=str, default='yolov5s.pt', help='model.pt path(s)')
    parser.add_argument('--source', type=str, default='data/images', help='source')  # file/folder, 0 for webcam
    parser.add_argument('--conf-thres', type=float, default=0.25, help='object confidence threshold')
    parser.add_argument('--iou-thres', type=float, default=0.45, help='IOU threshold for NMS')
    parser.add_argument('--device', default='', help='cuda device, i.e. 0 or 0,1,2,3 or cpu')
    parser.add_argument('--view-img', action='store_true', help='display results')
    parser.add_argument('--save-txt', action='store_true', help='save results to *.txt')
    parser.add_argument('--save-conf', action='store_true', help='save confidences in --save-txt labels')
    parser.add_argument('--save-crop', action='store_true', help='save cropped prediction boxes')
    parser.add_argument('--nosave', action='store_true', help='do not save images/videos')
    parser.add_argument('--classes', nargs='+', type=int, help='filter by class')  # filter by class
    parser.add_argument('--agnostic-nms', action='store_true', help='class-agnostic NMS')
    parser.add_argument('--augment', action='store_true', help='augmented inference')
    parser.add_argument('--update', action='store_true', help='update all models')
    parser.add_argument('--project', default='runs/detect', help='save results to project/name')
    parser.add_argument('--name', default='exp', help='save results to project/name')
    parser.add_argument('--exist-ok', action='store_true', help='existing project/name ok, do not increment')
    opt = parser.parse_args()

    # Attempt to find and load specified model
    device = torch.device(opt.device)
    model = attempt_load(opt.weights, map_location=device)

    # Detect objects and print classes and coordinates
    results = detect_classes(opt.source, model, opt.conf_thres, opt.iou_thres)
    for result in results:
        print('Class:', result['class'])
        print('Coordinates:', result['coordinates'])
