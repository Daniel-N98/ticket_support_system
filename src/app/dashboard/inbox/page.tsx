import InboxContent from "@/components/inbox/InboxContent";
import InboxHeader from "@/components/inbox/InboxHeader";

export default function InboxPage() {

  return (
    <div>
      <InboxHeader />
      <section className="w-full min-h-187.5 bg-main-secondary mt-6 rounded-lg">
        <InboxContent />
      </section>
    </div>
  )
}