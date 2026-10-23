import CVHero from "./_CVCom/CVHero/CVHero";
import PersonalInformation from "./_CVCom/PersonalInformation/PersonalInformation";
import WorkExperience from "./_CVCom/WorkExperience/WorkExperience";
import Education from "./_CVCom/Education/Education";
import Skills from "./_CVCom/Skills/Skills";
import GenerateCVButton from "./_CVCom/GenerateCVButton/GenerateCVButton";

export default function CVGeneratorPage() {
  return (
    <div className="p-6">
      <div className="space-y-6">

        <CVHero />

        <PersonalInformation />

        <WorkExperience />

        <Education />

        <Skills />

        <GenerateCVButton />

      </div>
    </div>
  );
}
