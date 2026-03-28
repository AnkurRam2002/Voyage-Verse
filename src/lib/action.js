"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "@/auth";
import bcrypt from "bcryptjs";


export const handleGithubLogin = async() => {
    "use server"
    await signIn("github");
  }

export const handleLogout = async() => {
    "use server"
    await signOut();
  }

  export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } =
      Object.fromEntries(formData);
  
    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }
  
    try {
      connectToDb();
  
      const user = await User.findOne({ username });
  
      if (user) {
        return { error: "Username already exists" };
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        img,
      });
  
      await newUser.save();
      console.log("saved to db");
  
      return { success: true };
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { username, password });
    } catch (err) {
      console.log(err);
  
      if (err.message.includes("CredentialsSignin")) {
        return { error: "Invalid username or password" };
      }
      throw err;
    }
  };

  export const addPost = async (prevState,formData) => {
  
    const { title, desc, img, userId, location } = Object.fromEntries(formData);
  
    const baseSlug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'post';
    const slug = `${baseSlug}-${Date.now().toString(36)}`;
  
    // Geocode the location string to latitude and longitude
    let lat, lng;
    if (location) {
      try {
        const geocodeRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`, {
          headers: { "User-Agent": "VoyageVerseApp/1.0" }
        });
        const geocodeData = await geocodeRes.json();
        
        if (geocodeData && geocodeData.length > 0) {
          lat = parseFloat(geocodeData[0].lat);
          lng = parseFloat(geocodeData[0].lon);
        }
      } catch (err) {
        console.error("Geocoding failed:", err);
      }
    }

    // Auto-fetch image from Pexels if none provided
    let finalImg = img;
    if (!img && (location || title)) {
      try {
        const queryText = `${title || ""} ${location || ""} travel photography landscape`.trim();
        const query = encodeURIComponent(queryText);
        const pexelsRes = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`,
          { headers: { Authorization: process.env.PEXELS_API_KEY } }
        );
        const pexelsData = await pexelsRes.json();
        if (pexelsData?.photos?.length > 0) {
          finalImg = pexelsData.photos[0].src.large2x;
        }
      } catch (err) {
        console.error("Pexels fetch failed:", err);
      }
    }

    try {
      connectToDb();
      const newPost = new Post({
        title,
        desc,
        slug,
        img: finalImg,
        userId,
        location,
        lat,
        lng,
      });
  
      await newPost.save();
      console.log("saved to db");
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const updatePost = async (prevState, formData) => {
    const { id, title, desc, img, location } = Object.fromEntries(formData);
  
    try {
      connectToDb();
      const updateData = { title, desc, img, location };
  
      if (title) {
        const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        updateData.slug = `${baseSlug}-${Date.now().toString(36)}`;
      }
  
      if (location) {
        try {
          const geocodeRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`, {
            headers: { "User-Agent": "VoyageVerseApp/1.0" }
          });
          const geocodeData = await geocodeRes.json();
          if (geocodeData && geocodeData.length > 0) {
            updateData.lat = parseFloat(geocodeData[0].lat);
            updateData.lng = parseFloat(geocodeData[0].lon);
          }
        } catch (err) {
          console.error("Geocoding failed during update:", err);
        }
      }
  
      if (!img && (location || title)) {
        try {
          const queryText = `${title || ""} ${location || ""} travel photography landscape`.trim();
          const pexelsRes = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(queryText)}&per_page=1&orientation=landscape`,
            { headers: { Authorization: process.env.PEXELS_API_KEY } }
          );
          const pexelsData = await pexelsRes.json();
          if (pexelsData?.photos?.length > 0) {
            updateData.img = pexelsData.photos[0].src.large2x;
          }
        } catch (err) {
          console.error("Pexels fetch failed during update:", err);
        }
      }
  
      await Post.findByIdAndUpdate(id, updateData);
      console.log("updated in db");
      revalidatePath("/blog");
      revalidatePath("/admin");
      return { success: true };
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };
  
  export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDb();
  
      await Post.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };
  
  export const addUser = async (prevState,formData) => {
    const { username, email, password, img } = Object.fromEntries(formData);
  
    try {
      connectToDb();
      const newUser = new User({
        username,
        email,
        password,
        img,
      });
  
      await newUser.save();
      console.log("saved to db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };
  
  export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDb();
  
      await Post.deleteMany({ userId: id });
      await User.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

export const updateUser = async (prevState, formData) => {
  const { id, username, email, img, password } = Object.fromEntries(formData);

  try {
    connectToDb();
    
    const updateData = { username, email, img };
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    await User.findByIdAndUpdate(id, updateData);
    console.log("updated in db");
    revalidatePath("/admin");
    revalidatePath("/profile");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};