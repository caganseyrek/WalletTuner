import React from "react";

import Footer from "../components/Footer";
import LandingHeader from "../components/LandingHeader";
import LinkedButton from "../components/LinkedButton";

const RootPage = () => {
  return (
    <div>
      <LandingHeader />
      <div className="w-[100vw] h-[calc(100vh-130px)] flex items-center justify-center gap-16 pb-[40px]">
        <div className="flex flex-col items-start justify-center gap-8">
          <div className="flex flex-col items-start justify-center gap-4">
            <h2 className="text-[50px] w-[486px] font-semibold tracking-tight leading-tight">
              Your Personal Finance,
              <br />
              Simplified
            </h2>
            <span className="w-[486px] text-muted-foreground">
              Effortlessly track expenses, set budgets,
              <br />
              and achieve your financial goals with WalletTuner
            </span>
          </div>
          <LinkedButton href="" variant="secondary" className="border">
            Try for Free
          </LinkedButton>
        </div>
        <img
          src={"/images/hero_image.webp"}
          alt={"Hero Image"}
          className="w-[500px] h-[300px] bg-cover rounded-lg border border-primary"
        />
      </div>
      <Footer />
    </div>
  );
};

export default RootPage;
