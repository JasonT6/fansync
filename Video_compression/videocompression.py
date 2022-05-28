from configparser import Interpolation
import cv2
import numpy as np
import json

vid = cv2.VideoCapture("Video_compression/vid1.mp4")

fps = vid.get(cv2.CAP_PROP_FPS)
# print("Frame rate: ", int(fps), "FPS")

height = 15
width = 60
array = []
frameCount = 0
success = True

while success == True:
    success, frame_prime = vid.read()
    if success == True:
        frame = cv2.resize(frame_prime,(width, height),fx = 0, fy = 0, interpolation = cv2.INTER_AREA)
        # cv2.imshow("frame", frame)
        array.append(frame)
        frameCount += 1

tempArray = np.array(array).tolist()
# jsonArray = json.dumps(tempArray)

with open('Video_compression/jsonArray.json', 'w') as f:
    json.dump(tempArray,f)


    # if cv2.waitKey(1) == ord('q'):
    #     break
# print(frameCount)
# print("This is pixel[50,50] frame 149")
# print(array[149][50][50])
# condensed = []

# for count, value in enumerate(array):
#     if(count - 1 < 0):
#         condensed.append([array[count][7][30], count])
#         continue
#     elif (array[count-1][7][30][0] != array[count][7][30][0]):
#         condensed.append([array[count][7][30], count])

# print(condensed)
