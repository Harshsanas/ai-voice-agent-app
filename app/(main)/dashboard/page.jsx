import React from "react";
import FeatureAssistant from "./_components/FeatureAssistant";
import History from "./_components/History";
import FeedbackForm from "./_components/FeedbackForm";

export default function Dashboard() {
  return (
    <div>
      <FeatureAssistant />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-15">
        <History />
        <FeedbackForm />
      </div>
    </div>
  );
}
