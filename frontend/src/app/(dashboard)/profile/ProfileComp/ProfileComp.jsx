'use client'
import React, { useEffect, useState } from 'react'
import { FiBookOpen, FiBriefcase, FiDownload,FiLinkedin ,FiGithub ,FiFacebook ,FiMessageCircle , FiEdit3, FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useMutation, useQuery } from '@tanstack/react-query';
import { uploadPhotoFn } from '@/app/apis/user/actions/uploadphoto.action';
import { toast } from 'react-toastify';



export default function ProfileComp() {
      const socialLinks = [
    {
      name: "LinkedIn",
      href: "#",
      icon: FiLinkedin,
    },
    {
      name: "GitHub",
      href: "#",
      icon: FiGithub,
    },
    {
      name: "Facebook",
      href: "#",
      icon: FiFacebook,
    },
    {
      name: "Message",
      href: "#",
      icon: FiMessageCircle,
    },
  ];
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
    // Create image preview
  useEffect(() => {
    if (!photo) {
      setPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(photo);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [photo]);
    // Select photo
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image");
      return;
    }

    setPhoto(file);
  }
  // api call 
  const { mutate: uploadPhoto, isPending:imgPending, isSuccess, isError } = useMutation({
  mutationFn: (formData) => uploadPhotoFn(formData),

  onSuccess: (response) => {
    console.log(response);
    toast.success("Photo uploaded successfully!", {position:'top-right'});
  },

  onError: (error) => {
    console.error(error);
    toast.error("Failed to upload photo");
  },
});
function handleUpload() {
  if (!photo) return;

  const formData = new FormData();
  formData.append("photo", photo);
   console.log(formData,'photo');
   
  uploadPhoto(formData);
}

// get profile data

 const {data , isPending}= useQuery({queryKey:['userProfile'], 
 queryFn:async ()=>{
    const data = await fetch(`/api/userProfile`)
    const payload = await data.json();

    console.log('Status:', data.status);
    console.log('Payload:', payload);

    if (!data.ok) {
      throw new Error(payload.message || 'Failed to fetch profile');
    }
    else {
     return payload
 }
 }})

  return (
       <div className="p-3 md:p-6">
      <div className=" lg:flex gap-4">

        {/* Left Profile Card */}
        <div className="lg:w-1/3">
             <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
         
               {/* Avatar */}
               <div className="flex flex-col items-center">
                <div className="relative">
  <input
    type="file"
    id="uploadPhoto"
    accept="image/*"
    className="hidden"
    onChange={handlePhotoChange}
  />

  <label
    htmlFor="uploadPhoto"
    className="relative flex size-40 cursor-pointer items-center justify-center overflow-hidden rounded-full border-[6px] border-violet-200 bg-gradient-to-br from-blue-500 to-violet-600 shadow-xl"
  >
    {preview ? (
      <img
        src={preview}
        alt="Profile"
        className="size-full object-cover"
      />
    ) : (
      <FiUser className="text-3xl text-white" />
    )}

    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-3 py-1 text-sm font-semibold text-white">
      Active
    </span>
  </label>
</div>

{photo && (
  <button
    type="button"
    onClick={handleUpload}
    disabled={isPending}
    className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-2 text-white disabled:opacity-50"
  >
    {isPending ? "Uploading..." : "Upload Photo"}
  </button>
)}

         
                 {/* Name */}
                 <h2 className="mt-9 text-center text-2xl font-bold text-slate-950">
                   {data?.results?.fullName}
                 </h2>
         
                 <p className="mt-2 text-center text-md font-semibold text-slate-500">
                      {data?.results?.major}
                 </p>
               </div>
         
               <div className="my-8 h-px bg-slate-200" />
         
               {/* Contact Information */}
               <div className="space-y-4">
         
                 <div className="flex items-center gap-4">
                   <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                     <FiPhone className="text-lg" />
                   </div>
         
                   <div className="">
                     <p className="text-sm font-semibold text-slate-500">
                       Phone
                     </p>
         
                     <p className="mt-1 text-md text-slate-900">
                       +970 123 456 789
                     </p>
                   </div>
                 </div>
         
                 <div className="flex items-center gap-4">
                   <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                     <FiMail className="text-lg" />
                   </div>
         
                   <div className="min-w-0 flex-1">
                     <p className="text-sm font-semibold text-slate-500">
                       Email
                     </p>
         
                     <p className="mt-1 text-md text-slate-900 break-all">
                         {data?.results?.email}
                     </p>
                   </div>
                 </div>
         
                 <div className="flex items-center gap-4">
                   <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                     <FiMapPin className="text-lg" />
                   </div>
         
                   <div>
                     <p className="text-sm font-semibold text-slate-500">
                       Location
                     </p>
         
                     <p className="mt-1 text-md text-slate-900">
                       Gaza City, Palestine
                     </p>
                   </div>
                 </div>
               </div>
         
               {/* Statistics */}
               <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="rounded-[20px] border border-violet-100 bg-[#F7F7FF] p-3 text-center">
                   <p className="text-3xl font-bold text-violet-600">
                     12
                   </p>
         
                   <p className="mt-1 text-sm font-medium text-slate-500">
                     Jobs Applied
                   </p>
                 </div>
         
                 <div className="rounded-[20px] border border-violet-100 bg-[#F7F7FF] p-3 text-center">
                   <p className="text-3xl font-bold text-violet-600">
                     8
                   </p>
         
                   <p className="mt-1 text-sm font-medium text-slate-500">
                     Courses Done
                   </p>
                 </div>
               </div>
         
               {/* CV Status */}
               <div className="mt-7 rounded-[20px] border border-violet-200 bg-[#FAFAFF] px-5 py-5">
         
                 <div className="flex items-center justify-between">
                   <p className="font-semibold text-slate-900">
                     CV Status
                   </p>
         
                   <span className="rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-2 py-1.5 text-xs font-bold text-white">
                     Completed
                   </span>
                 </div>
         
                 <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                   <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600" />
                 </div>
         
               </div>
             </section>
        </div>

        {/* Main Profile Content */}
        <div className="*:mt-4 mt-6 lg:mt-0 lg:w-2/3">
             <section className="rounded-[30px] border border-slate-100 bg-white p-8 shadow-sm">
          
                {/* Badge */}
                <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-medium uppercase tracking-wide text-violet-600">
                  Hello, I'm
                </span>
          
                {/* Name */}
                <h1 className="mt-7 text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
                     {data?.results?.fullName}
                </h1>
          
                {/* Job Title */}
                <p className="mt-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-xl font-bold text-transparent ">
                    {data?.results?.major}
                </p>
          
                {/* Description */}
                <p className="mt-8 max-w-3xl text-[17px] font-medium leading-8 text-slate-500">
                  Passionate developer skilled in React, Node.js, and modern web
                  technologies, looking for career opportunities through CodeBridge
                  Gaza. With a strong foundation in full-stack development, I bring
                  creativity and technical expertise to every project.
                </p>
          
                {/* Actions */}
                <div className="mt-10 flex flex-wrap gap-4">
          
                  {/* Download CV */}
                  <button
                    type="button"
                    className="inline-flex p-5 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 text-[16px] font-bold text-white shadow-lg shadow-violet-200 transition hover:scale-[1.02]"
                  >
                    <FiDownload className="text-[22px]" />
                    Download CV
                  </button>
          
                  {/* Edit Profile */}
                  <button
                    type="button"
                    className="inline-flex p-5 items-center justify-center gap-3 rounded-xl border-2 border-violet-600 bg-white px-8 text-[16px] font-bold text-violet-600 transition hover:bg-violet-50"
                  >
                    <FiEdit3 className="text-[22px]" />
                    Edit Profile
                  </button>
          
                </div>
              </section>

          <div id="skills">
            <section className="rounded-[30px] border border-slate-100 bg-white p-8 shadow-sm">
      
      <h2 className="text-2xl font-bold text-slate-950">
        Technical Skills
      </h2>

      <div className="mt-4 flex flex-wrap gap-4">
        {data?.results?.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-[14px] border border-violet-200 bg-[#F8F7FF] px-4 py-2 text-[16px] font-semibold text-violet-600 transition hover:border-violet-300 hover:bg-violet-50"
          >
            {skill}
          </span>
        ))}
      </div>

    </section>
          </div>

           <section className="rounded-[30px] border border-slate-100 bg-white p-8 shadow-sm">
      
      <h2 className="text-2xl font-bold text-slate-950">
        Follow Me
      </h2>

      <div className="mt-8 flex flex-wrap gap-5">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <Link
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="flex size-13 items-center justify-center rounded-full border border-violet-200 bg-[#FAF9FF] text-slate-500 transition-all duration-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 hover:-translate-y-1"
            >
              <Icon className="text-2xl" />
            </Link>
          );
        })}
      </div>

    </section>

          <div>
             <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  
                  {/* Experience */}
                  <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
            
                      <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <FiBriefcase className="text-2xl" />
                      </div>
            
                      <div>
                        <h3 className="text-xl font-bold text-slate-950">
                          Experience
                        </h3>
            
                        <p className="mt-1 text-md lg:text-sm font-medium text-slate-500">
                          5+ Years
                        </p>
                      </div>
                    </div>
            
                    <p className="mt-6 text-[16px] font-medium leading-7 text-slate-500">
                      Building modern web applications with expertise in full-stack
                      development.
                    </p>
                  </div>
            
                  {/* Education */}
                  <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">
            
                      <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                        <FiBookOpen className="text-2xl" />
                      </div>
            
                      <div>
                        <h3 className="text-xl font-bold text-slate-950">
                          Education
                        </h3>
            
                        <p className="mt-1 text-md lg:text-sm font-medium text-slate-500">
                          BSc Computer Science
                        </p>
                      </div>
                    </div>
            
                    <p className="mt-6 text-[16px] font-medium leading-7 text-slate-500">
                      Islamic University of Gaza, graduated with honors in 2019.
                    </p>
                  </div>
            
                </section>
          </div>
        </div>

      

      </div>
    </div>
  )
}
