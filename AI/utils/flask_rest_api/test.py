import pandas as pd
import numpy as np

d = {"a" : [1,3], "b": [1,2]}
df = pd.DataFrame(d)

for i in df:
    print(i)
print(len(df))
for i in range(len(df)):
    print(df.loc[i,'a'])