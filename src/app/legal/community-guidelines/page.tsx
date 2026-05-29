import { InfoPage } from "@/components/InfoPage";

export default function Page() {
  return (
    <InfoPage
      eyebrow="FanSpot"
      title="Community guidelines"
      description="FanSpot should launch with clear, safe, general creatorâ€‘platform rules before accepting public users or paid creator activity."
      cards={[
        { title: "Respectful conduct", body: "No harassment, impersonation, spam, threats, or manipulation of platform systems." },
        { title: "Safe content", body: "The FanSpot is structured as a general creator platform and does not include adultâ€‘content features." },
        { title: "Report and review", body: "Fans can report content; moderators review and document decisions in audit logs." },
      ]}
    >
      <div className="space-y-4 rounded-3xl border border-slate-800 bg-black/10 p-6">
        <h2 className="text-xl font-black text-white">Additional guidelines</h2>
        <p className="text-sm leading-6 text-slate-300">
          Our community thrives when creators and fans treat one another with respect and kindness. To maintain a welcoming environment, we
          ask that all members follow these guidelines:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
          <li>Be kind and respectful when engaging with creators and other fans. Personal attacks and hateful language will not be tolerated.</li>
          <li>Share only content that you have the right to post. Do not upload material that infringes on someone else&apos;s rights.</li>
          <li>Keep your communications appropriate for all audiences. Content with nudity, violence, or illegal activity is prohibited.</li>
          <li>Use the report tools to flag any content or behavior that violates these guidelines. Our moderation team will review and act accordingly.</li>
        </ul>
      </div>
    </InfoPage>
  );
}

