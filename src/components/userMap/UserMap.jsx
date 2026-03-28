"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import styles from "./userMap.module.css";
import Link from "next/link";
import Image from "next/image";

// Leaflet configuration needed for markers to show correctly in Next.js
const fixLeafletIcon = async () => {
  const L = await import("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
};

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const MarkerClusterGroup = dynamic(
  () => import("react-leaflet-cluster").then((mod) => mod.default),
  { ssr: false }
);

const UserMap = ({ posts }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fixLeafletIcon();
    setMounted(true);
  }, []);

  if (!mounted) return <div className={styles.mapPlaceholder}>Loading Map...</div>;

  // Filter posts that have lat and lng
  let mappedPosts = posts.filter(post => post.lat && post.lng);

  if (mappedPosts.length === 0) {
    mappedPosts = [
      {
        _id: "demo1",
        title: "Eiffel Tower Adventure",
        img: "https://images.pexels.com/photos/161815/paris-eiffel-tower-france-architecture-161815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        slug: "#",
        lat: 48.8584,
        lng: 2.2945,
      },
      {
        _id: "demo2",
        title: "Colosseum Tour",
        img: "https://images.pexels.com/photos/1701595/pexels-photo-1701595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        slug: "#",
        lat: 41.8902,
        lng: 12.4922,
      },
      {
        _id: "demo3",
        title: "Swiss Alps Hiking",
        img: "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        slug: "#",
        lat: 46.5628,
        lng: 7.9796,
      },
    ];
  }

  // Calculate center based on first post, or default to Europe
  const center = mappedPosts.length > 0 
    ? [mappedPosts[0].lat, mappedPosts[0].lng] 
    : [48.8566, 2.3522];

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={center} zoom={3} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {mappedPosts.map((post) => (
            <Marker key={post._id} position={[post.lat, post.lng]}>
              <Popup>
                <div className={styles.popupContainer}>
                  {post.img && (
                    <div className={styles.popupImgContainer}>
                       <img src={post.img} alt={post.title} className={styles.popupImg} />
                    </div>
                  )}
                  <div className={styles.popupText}>
                    <h4>{post.title}</h4>
                    <Link href={`/blog/${post.slug}`} className={styles.popupLink}>
                      Read Story
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default UserMap;
