"use client";

import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiShare2,
  FiEdit,
  FiDownload,
} from "react-icons/fi";

import Link from "next/link";

export default function CVPreviewPage() {


const handleDownloadPDF = async () => {

  const cv = document.getElementById("cv-content");

  const canvas = await html2canvas(cv, {
    scale: 2,
  });


  const imgData = canvas.toDataURL("image/png");


  const pdf = new jsPDF(
    "p",
    "mm",
    "a4"
  );


  const pdfWidth = pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth) / canvas.width;


  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );


  pdf.save("Ahmed-Hassan-CV.pdf");

};


    const [copied, setCopied] = useState(false);
    const handleShare = async () => {
  await navigator.clipboard.writeText(window.location.href);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-8 py-10">


      {/* Top Actions */}
      <div className="mb-10 flex items-center justify-between">


        {/* Back */}
       <Link
  href="/cv-generator"
  className="flex items-center gap-3 text-[17px] font-semibold text-slate-600 transition hover:text-[#6746AC]"
>
  ←
  Back to Editor
</Link>



        {/* Buttons */}
        <div className="flex gap-4">


         <button
  onClick={handleShare}
  className="
  flex h-14 items-center gap-3 rounded-xl cursor-pointer
  border border-slate-200 bg-white
  px-7 text-[16px] font-semibold
  text-slate-700 shadow-sm
  transition hover:border-violet-300 hover:text-violet-600
  "
>
  <FiShare2 />

  {copied ? "Copied!" : "Share"}

</button>



         <Link
  href="/cv-generator"
  className="
  flex h-14 items-center gap-3 rounded-xl cursor-pointer
  border border-slate-200 bg-white
  px-7 text-[16px] font-semibold
  text-slate-700 shadow-sm
  transition hover:border-violet-300 hover:text-violet-600
  "
>
  <FiEdit />
  Edit
</Link>



          <button
          onClick={handleDownloadPDF}
            className="
            flex h-14 items-center gap-3 rounded-xl
            bg-gradient-to-r from-[#263F91] to-[#6746AC]
            px-7 text-[16px] font-bold
            text-white shadow-md cursor-pointer
            "
          >
            <FiDownload />
            Download PDF
          </button>


        </div>


      </div>




      {/* CV Container */}
      <div
       id="cv-content"
        className="
        mx-auto max-w-[1150px]
        overflow-hidden rounded-2xl
        bg-white shadow-xl
        "
      >


        {/* CV Header */}
        <div
          className="
          bg-gradient-to-r from-[#263F91] to-[#6746AC]
          px-16 py-12 text-white
          "
        >


          <h1 className="text-3xl font-extrabold">
            Ahmed Hassan
          </h1>


          <p className="mt-2 text-xl font-semibold text-white/90">
            Frontend Developer
          </p>



          <div className="mt-8 flex flex-wrap gap-8 text-[16px]">


            <div className="flex items-center gap-3">
              <FiMail />
              ahmed@example.com
            </div>


            <div className="flex items-center gap-3">
              <FiPhone />
              +970 123 456 789
            </div>


            <div className="flex items-center gap-3">
              <FiMapPin />
              Gaza City, Palestine
            </div>


          </div>


        </div>
        {/* CV Body */}
<div className="px-16 py-12">


  {/* Professional Summary */}
  <section className="mb-12">

    <h2 className="text-xl font-extrabold text-slate-950">
      Professional Summary
    </h2>

    <div className="mt-3 h-[2px] bg-gradient-to-r from-[#6746AC] to-transparent" />


    <p className="mt-6 text-[18px] leading-9 text-slate-600">
      Passionate frontend developer with 3+ years of experience
      building modern web applications using React and TypeScript.
      Proven track record of delivering high-quality, responsive user
      interfaces and collaborating effectively with cross-functional teams.
    </p>


  </section>




  {/* Work Experience */}
  <section className="mb-12">

    <h2 className="text-xl font-extrabold text-slate-950">
      Work Experience
    </h2>

    <div className="mt-3 h-[2px] bg-gradient-to-r from-[#6746AC] to-transparent" />



    {/* Experience 1 */}
    <div className="mt-8">


      <div className="flex justify-between">

        <div>

          <h3 className="text-[20px] font-bold text-slate-950">
            Frontend Developer
          </h3>

          <p className="mt-1 text-[14px] font-semibold text-[#6746AC]">
            TechPalestine
          </p>

        </div>


        <div className="text-right text-slate-600">

          <p className="text-[16px]">
            2021 - Present
          </p>

          <p>
            Gaza City
          </p>

        </div>


      </div>



      <ul className="mt-5 list-disc space-y-3 pl-6 text-[17px] text-slate-600">

        <li>
          Built responsive web applications using React and TypeScript
        </li>

        <li>
          Collaborated with designers and backend developers to deliver high-quality products
        </li>

        <li>
          Implemented modern UI/UX patterns and best practices
        </li>

        <li>
          Optimized application performance and reduced load times by 40%
        </li>

      </ul>


    </div>


  </section>
{/* Education */}
<section className="mb-12">

  <h2 className="text-xl font-extrabold text-slate-950">
    Education
  </h2>

  <div className="mt-3 h-[2px] bg-gradient-to-r from-[#6746AC] to-transparent" />


  <div className="mt-8 flex justify-between">


    <div>

      <h3 className="text-[20px] font-bold text-slate-950">
        Bachelor of Computer Science
      </h3>

      <p className="mt-1 text-[16px] font-semibold text-[#6746AC]">
        Islamic University of Gaza
      </p>

    </div>


    <div className="text-right text-slate-600">

      <p className="text-[16px]">
        2017 - 2021
      </p>

      <p>
        GPA: 3.8/4.0
      </p>

    </div>


  </div>

</section>





{/* Technical Skills */}
<section className="mb-12">

  <h2 className="text-xl font-extrabold text-slate-950">
    Technical Skills
  </h2>


  <div className="mt-3 h-[2px] bg-gradient-to-r from-[#6746AC] to-transparent" />



  <div className="mt-8 grid grid-cols-2 gap-y-5 text-[16px] text-slate-600">


    <div className="flex items-center gap-3">
      <span className="text-[#6746AC]">●</span>
      React & React Hooks
    </div>


    <div className="flex items-center gap-3">
      <span className="text-[#6746AC]">●</span>
      TypeScript & JavaScript
    </div>


    <div className="flex items-center gap-3">
      <span className="text-[#6746AC]">●</span>
      HTML5 & CSS3
    </div>


    <div className="flex items-center gap-3">
      <span className="text-[#6746AC]">●</span>
      Tailwind CSS
    </div>


    <div className="flex items-center gap-3">
      <span className="text-[#6746AC]">●</span>
      Git & Version Control
    </div>


    <div className="flex items-center gap-3">
      <span className="text-[#6746AC]">●</span>
      UI/UX Design Principles
    </div>


    <div className="flex items-center gap-3">
      <span className="text-[#6746AC]">●</span>
      Responsive Web Design
    </div>


    <div className="flex items-center gap-3">
      <span className="text-[#6746AC]">●</span>
      RESTful APIs
    </div>


  </div>


</section>

{/* Languages */}
<section className="mb-12">

  <h2 className="text-xl font-extrabold text-slate-950">
    Languages
  </h2>


  <div className="mt-3 h-[2px] bg-gradient-to-r from-[#6746AC] to-transparent" />


  <div className="mt-8 grid grid-cols-2 gap-8">


    <div>
      <h3 className="text-[18px] font-bold text-slate-950">
        Arabic
      </h3>

      <p className="mt-2 text-[16px] text-slate-600">
        Native
      </p>
    </div>



    <div>
      <h3 className="text-[18px] font-bold text-slate-950">
        English
      </h3>

      <p className="mt-2 text-[16px] text-slate-600">
        Fluent
      </p>
    </div>


  </div>


</section>

</div>

{/* Footer */}
<div className="border-t border-slate-200 px-10 py-6 text-center text-[14px] font-medium text-slate-500">

  Generated by CodeBridge Gaza • Professional CV Builder

</div>
      </div>


    </div>
  );
}