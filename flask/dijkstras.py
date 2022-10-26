import math
import pandas as pd
from queue import PriorityQueue
import matplotlib.pyplot as plt
from PIL import Image

def distance(x1, y1, x2, y2) :
    return math.sqrt((x1 - x2)*(x1 - x2) + (y1-y2)* (y1-y2))

def findDestinationIndex(str,destinations):
    for i in range(len(destinations)):
        if destinations[i] == [str]:
            return i
    return -1

def findDistance(startPlace = "University town", endPlace="", distance=[],destinations=[]):
    row = findDestinationIndex(startPlace,destinations)
    col = findDestinationIndex(endPlace,destinations)
    return distance[row][col]

def dijkstras(startIndex, endIndex, distance):
    visited = [startIndex]
    notReach = True
    res = []
    while notReach:
        q = PriorityQueue()
        for visit in visited:
            for i in range(len(distance)):
                if i not in visited:
                    q.put((distance[visit][i],visit,i))
        temp = q.get()
        visited.append(temp[2])
        res.append([temp[1],temp[2]])
        if temp[2] == endIndex:
            notReach = False
    return res

def findPath(l):
    res = [l[len(l)-1][1],l[len(l)-1][0]]
    goal = l[len(l)-1][0]
    for i in range(len(l)):
        if l[len(l)-i-1][1] == goal:
            res.append(l[len(l)-i-1][0])
            goal = l[len(l)-i-1][0]
    res.reverse()
    return res

def drawMap(listX, listY):
    singapore_img = Image.open("./sg_route_map_background.png")
    df = pd.read_csv("./cluster_result.csv", sep=',', encoding='latin-1')
    df.plot.scatter(
      x="lon", 
      y="lat", 
      figsize=(20,14),
      c='b',
      s=10,
      colorbar=False, 
      alpha=0.8,
      zorder=2
    )
    extent=[103.6804, 103.9986, 1.2613, 1.4023]
    plt.plot(listY, listX, color='red', linewidth=2.5)
    plt.imshow(singapore_img, extent=[103.6804, 103.9986, 1.2613, 1.4023], alpha=0.6,zorder=0) 
    plt.ylabel("Latitude", fontsize=20)
    plt.xlabel("Longitude", fontsize=20)
    plt.ylim(extent[2], extent[3])
    plt.xlim(extent[0], extent[1])
    plt.legend(fontsize=20)
    plt.axis("off")
    plt.savefig('./Dij_shortpath.png', bbox_inches='tight', pad_inches=0.0)
    path='./Dij_shortpath.png'
    return path

def getXY(l):
    listX = []
    listY = []
    df = pd.read_csv("./cluster_result.csv", sep=',', encoding='latin-1')
    for i in l:
        listX.append(df.lat[i])
        listY.append(df.lon[i])
    return listX, listY

def distanceSort(route,distance,destinations):
    arr = []

    for i in range(1,len(route)):
        arr.append([findDistance(route[0],route[i],distance,destinations),i])
    def k(x):
        return x[0]
    arr.sort(key=k)
    print(arr)
    res = [route[0]]
    for i in range(len(arr)):
        res.append(route[arr[i][1]])
    return res

def dijikstrasDraw(route):
    distance = pd.read_csv("distance.csv",index_col=0).values.tolist()
    destinations = pd.read_csv("destinations.csv",index_col=0).values.tolist()
    routePath = []
    route = distanceSort(route,distance,destinations)
    print(route)
    for i in range(len(route)-1):
        startIndex = findDestinationIndex(route[i],destinations)
        endIndex = findDestinationIndex(route[i+1],destinations)
        l = dijkstras(startIndex, endIndex, distance)
        routePath += findPath(l)
    listX, listY = getXY(routePath)
    return drawMap(listX,listY)
if __name__ == '__main__':
    dijikstrasDraw(['University town','Wisma Atria Shopping Centre','Aft Tg Katong Cplx'])
