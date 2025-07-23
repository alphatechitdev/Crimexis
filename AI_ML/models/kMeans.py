from sklearn.cluster import KMeans
import numpy as np

def ApplyKMeans(data):
    kmeans = KMeans(n_clusters=1, n_init=10)
    kmeans.fit(data)
    centre = kmeans.cluster_centers_[0]
    distances = np.linalg.norm(data-centre, axis=1)
    nearest_index = distances.argmin()
    hotspot_centers = kmeans.cluster_centers_
    hotspots = hotspot_centers.tolist()
    hotspots.append(data[nearest_index])
    return hotspots

