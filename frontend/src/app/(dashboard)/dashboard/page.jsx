import AvailableCourses from "./_dashboardCom/AvailableCourses/AvailableCourses";
import LatestCourses from "./_dashboardCom/LatestCourses/LatestCourses";
import LatestJobs from "./_dashboardCom/LatestJobs/LatestJobs";
import ProfileCard from "./_dashboardCom/ProfileCard/ProfileCard";
import QuickActions from "./_dashboardCom/QuickActions/QuickActions";
import RecentApplications from "./_dashboardCom/RecentApplications/RecentApplications";
import RecommendedJobs from "./_dashboardCom/RecommendedJobs/RecommendedJobs";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">

        <div className="space-y-6 xl:col-span-9">
          <ProfileCard />
          <QuickActions />
          <RecommendedJobs />
          <AvailableCourses />
          <RecentApplications />
        </div>

        <div className="space-y-6 xl:col-span-3">
          <LatestJobs />
          <LatestCourses />
        </div>

      </div>
    </div>
  );
}