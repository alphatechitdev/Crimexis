from sklearn.cluster import KMeans


def ApplyKMeans(data):
    kmeans = KMeans(n_clusters=5)
    kmeans.fit(data)
    hotspot_centers = kmeans.cluster_centers_
    return hotspot_centers




