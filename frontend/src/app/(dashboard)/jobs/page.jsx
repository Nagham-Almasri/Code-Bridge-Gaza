import JobsHero from "./_JobsCom/JobsHero/JobsHero";
import JobOpportunities from "./_JobsCom/JobOpportunities/JobOpportunities";

export default function JobsPage() {
  return (
    <div className="p-6">

      <div className="space-y-10">

        <JobsHero />

        <JobOpportunities />

      </div>

    </div>
  );
}