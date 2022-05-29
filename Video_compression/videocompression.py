from configparser import Interpolation
import cv2
import numpy as np
import json

#   location of cheer video
vid = cv2.VideoCapture("Video_compression/vid3.mp4")

fps = vid.get(cv2.CAP_PROP_FPS)

#   Required height of video based on seat map
height = 28

#   Required width of video based on seat map
width = 78
array = []
frameCount = 0
success = True

while success == True:
    success, frame_prime = vid.read()
    if success == True:
        frame = cv2.resize(frame_prime,(width, height),fx = 0, fy = 0, interpolation = cv2.INTER_AREA)
        array.append(frame)
        frameCount += 1

tempArray = np.array(array).tolist()

#   Output array of video at required resolution
with open('Video_compression/jsonArray3.json', 'w') as f:
    json.dump(tempArray,f)
