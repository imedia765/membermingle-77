import { Header } from "@/components/Header";
import { InfoCard } from "@/components/InfoCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-8 animate-fade-in">
          Pakistan Welfare Association Updates
        </h1>

        <InfoCard title="What we've been doing">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Brother Sajid has resigned and a new Committee was formally created. We would like to thank brother Sajid for his previous efforts, and he will continue helping the Committee where possible in an informal capacity.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">New Committee as of December 2023</h3>
              <ul className="list-disc list-inside">
                <li>Chairperson: Anjum Riaz & Habib Mushtaq</li>
                <li>Secretary: Tariq Majid</li>
                <li>Treasurer: Faizan Uddin</li>
              </ul>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="What we expect">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>All members have been given membership numbers. Please contact your collector to find this out.</li>
            <li>Please login individually and fill in required data.</li>
            <li>We expect timely payments that are up to date.</li>
            <li>Collectors who are timely and up to date, thank you and please continue with your efforts.</li>
          </ul>
        </InfoCard>

        <InfoCard title="Important Information">
          <div className="space-y-4 text-muted-foreground">
            <p>
              Unfortunately we are not taking on new members. So if Collectors are in arrears, they will be given deadlines to clear arrears. After this deadline you will no longer be considered to be a member of Pakistan Welfare Committee, and currently we are not taking any more members so so you will be advised to join another Committee if they are willing to take new members.
            </p>
            <p>
              Only members who become of age will be added as new members.
            </p>
            <p>
              If there are members in the community that feel they can assist in a voluntary capacity to improve aspects of the processes involved, please get in touch with the Committee.
            </p>
          </div>
        </InfoCard>
      </main>
    </div>
  );
};

export default Index;