
# 일기

 - yolov5모델이 학습할 때 GPU를 사용하지 않는다. 해당문제로 주말동안 계속 고통 받았다.
 - 노트북 자체가 GPU를 사용하지 않는 문제는 드라이브 설치로 해결 하였다.
 - yolov5모델이 GPU를 사용하지 않는 문제는 requirements문서로 pip install을 하면 pytorch가 cpu버전으로 받아지는 것이었다.
 - CUDA와 pyTorch 모두 최신 버전으로 받아서 실행해보니 버전이 맞지 않아 오류가 났다. torch가 2버전으로 올라가면서 바뀐게 있는것같다.
 - CUDA 1.6, pyTorch 1.13버전을 다운받아서 GPU를 사용가능하게 개발환경을 구축했다.
 - 소규모 데이터로 입만 labeling 한 데이터와 얼굴전체로 labeling한 데이터를 학습시켰다. 그 결과 입만 labeling한 데이터가 훨씬 정확도가 높았다.
 - 학습결과 입만 나오면 eating 행위로 인식했지만 confidence score의 차이가 확실히 있어 threshold값을 적절히 조절하면 쓸만한 모델이 될것 같다.
 - 학습결과는 첨부파일 참고하시면 됩니다.