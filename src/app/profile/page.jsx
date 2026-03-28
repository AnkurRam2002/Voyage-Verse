import styles from "./profile.module.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";
import { getUserPosts } from "@/lib/data";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const posts = await getUserPosts(session.user.id);

  // We need to pass plain objects to client components (avoiding mongoose objects directly)
  const plainPosts = posts.map(post => ({
    _id: post._id.toString(),
    title: post.title,
    desc: post.desc,
    img: post.img,
    slug: post.slug,
    lat: post.lat,
    lng: post.lng
  }));

  return (
    <div className={styles.container}>
      <ProfileClient user={session.user} posts={plainPosts} />
    </div>
  );
};

export default ProfilePage;
