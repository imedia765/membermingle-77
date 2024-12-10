import { Header } from "@/components/Header";
import { InfoCard } from "@/components/InfoCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 space-y-8 max-w-4xl mx-auto">
        <div className="grid gap-6">
          <InfoCard title="What we've been doing">
            <div className="space-y-4 text-muted-foreground">
              <p>
                Brother Sajid has resigned and a new Committee was formally created. We would like to thank brother Sajid for his previous efforts, and he will continue helping the Committee where possible in an informal capacity.
              </p>
              <p>
                New Committee, <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link>, and registration, formalise roles for <Link to="/collector-responsibilities" className="text-primary hover:underline">Collectors Responsibilities</Link>
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">New Committee as of December 2023</h3>
                <ul className="list-disc list-inside pl-4">
                  <li>Chairperson: Anjum Riaz & Habib Mushtaq</li>
                  <li>Secretary: Tariq Majid</li>
                  <li>Treasurer: Faizan Qadiri</li>
                </ul>
              </div>
              <p>Terms have been updated.</p>
              <p className="text-sm italic">Website has been created and coded by Zaheer Asghar</p>
            </div>
          </InfoCard>

          <InfoCard title="What we expect">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
              <li>All members have been given membership numbers. Please contact your collector to find this out.</li>
              <li>Please login individually and fill in required data.</li>
              <li>We expect timely payments that are up to date.</li>
              <li>Collectors who are timely and up to date, thank you, and please continue with your efforts.</li>
              <li>Those not up to date, please find out your membership number from your collector, then please login online and make payment as soon as possible.</li>
              <li>If payments are not up to date then you will not be covered.</li>
            </ul>
          </InfoCard>

          <InfoCard title="Important Information">
            <div className="space-y-4 text-muted-foreground">
              <p>Trialled so far online payment using Stripe - not enough uptake, sidelined for possible future use.</p>
              <p className="font-medium text-destructive">Check with your collector if payments up to date, if not up to date YOU ARE NOT COVERED! The responsibility to pay is on the member, not the Collector.</p>
              <p>
                Unfortunately we are not taking on new members. So if Collectors are in arrears, they will be given deadlines to clear arrears. After this deadline you will no longer be considered to be a member of Pakistan Welfare Committee, and currently we are not taking any more members on so you will be advised to join another Committee if they are willing to take new members.
              </p>
              <p>Only members who become of age will be added as new members.</p>
              <p>
                We humbly request everyone keeps their payments up to date, the best method is to pay directly here.
              </p>
              <p>
                If there are members in the community that feel they can assist in a voluntary capacity to improve aspects of the processes involved, please get in touch with the Committee.
              </p>
            </div>
          </InfoCard>

          <InfoCard title="Medical Examiner Process">
            <div className="space-y-4 text-muted-foreground">
              <p>
                To understand our comprehensive Medical Examiner Death Certification process, please review our detailed Medical Examiner Flow Chart.
              </p>
              <p>
                This flow chart provides a step-by-step guide to the death certification process, ensuring transparency and clarity for all members.
              </p>
              <Button variant="outline" className="mt-4">
                View Flow Chart
              </Button>
            </div>
          </InfoCard>
        </div>
      </main>
    </div>
  );
};

export default Index;