import ProfileInfoCard from "./_ProfileCom/ProfileInfoCard/ProfileInfoCard";
import ProfileIntro from "./_ProfileCom/ProfileIntro/ProfileIntro";
import TechnicalSkills from "./_ProfileCom/TechnicalSkills/TechnicalSkills";
import SocialLinks from "./_ProfileCom/SocialLinks/SocialLinks";
import ExperienceEducation from "./_ProfileCom/ExperienceEducation/ExperienceEducation";


export default function ProfilePage() {
  return (
    <div className="p-3 md:p-6">
      <div className=" lg:flex gap-4">

        {/* Left Profile Card */}
        <div className="lg:w-1/3">
          <ProfileInfoCard />
        </div>

        {/* Main Profile Content */}
        <div className="*:mt-4 mt-6 lg:mt-0 lg:w-2/3">
          <ProfileIntro />

          <div id="skills">
            <TechnicalSkills />
          </div>

          <SocialLinks />

          <div>
            <ExperienceEducation />
          </div>
        </div>

      

      </div>
    </div>
  );
}