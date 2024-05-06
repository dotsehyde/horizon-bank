import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access & manage your account and transactions with ease."
          />
          <TotalBalanceBox
            totalBanks={1}
            totalCurrentBalance={123}
            accounts={[]}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        banks={[{ currentBalance: 123.45 }, { currentBalance: 567.34 }]}
        user={loggedIn}
        transactions={[]}
      />
    </section>
  );
};

export default Home;
