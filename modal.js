(function () {
  "use strict";

  const messages = {
    collaborative: `Subject: Proposal for RFP-28491 – Value Dossiers Development

Hi [Buyer Name],

Thank you for sharing the RFP details for your Value Dossiers Development project. We're genuinely excited about the opportunity to support Acme Pharma in this work.

Having reviewed your priorities, we've put together a proposal at $82,500, structured with milestone-based billing to align with your approval checkpoints. We've built in senior HEOR review at each stage and a prespecified protocol to meet your audit-ready documentation requirements.

We're flexible on phased delivery if that supports your internal review cycles, and we're open to discussing the scope further to make sure we're aligned on value and timeline.

Looking forward to connecting — please let us know if a call this week would be helpful.

Best regards,
[Your Name]`,
    firm: `Subject: Revised Proposal – RFP-28491

Hi [Buyer Name],

Thank you for considering our team for the Value Dossiers Development engagement.

Our proposal stands at $88,000, reflecting the senior HEOR resources, reproducible search methodology, and audit-ready deliverables you've specified. This is benchmarked against comparable dossier engagements and is competitive given the quality tier you require.

We are able to offer milestone billing and a phased interim review at week 6, but are not in a position to reduce scope or compress timelines without impacting quality.

We believe our proposal represents strong value for this engagement. We're happy to walk through the line-item breakdown at your convenience.

Best regards,
[Your Name]`,
    conciliatory: `Subject: Following Up on RFP-28491 – Happy to Find a Path Forward

Hi [Buyer Name],

Thank you for your feedback on our initial proposal. We appreciate your transparency about budget constraints, and we'd like to find a structure that works well for both teams.

We can bring our proposal to $77,000 by scoping the interim deliverable as a targeted evidence map rather than a full outline review, while preserving senior HEOR oversight on the final dossier.

We're also happy to discuss phased payment milestones if that supports your internal approvals. Our goal is a smooth engagement that meets your standards without either side feeling stretched.

Would a 20-minute call work to align on next steps?

Warm regards,
[Your Name]`,
    direct: `Subject: RFP-28491 Counter-Proposal

Hi [Buyer Name],

Our revised proposal is $80,000, fixed-fee, with milestone billing at kickoff, interim review, and final delivery.

Key inclusions: prespecified protocol, PRISMA-style evidence synthesis, senior HEOR sign-off, and audit-ready documentation.

We can begin the week of May 5 and deliver the final dossier by mid-July as specified.

Let us know if you'd like to proceed or if there are specific scope items to discuss.

[Your Name]`,
  };

  let currentTone = "collaborative";

  function clearMsgBoxHeight() {
    const box = document.getElementById("msgBox");
    if (box) box.style.removeProperty("height");
  }

  function showMessage(tone, animate) {
    const box = document.getElementById("msgBox");
    const gen = document.getElementById("generatingIndicator");
    if (!box || !gen) return;

    if (animate) {
      box.style.display = "none";
      gen.classList.add("active");
      setTimeout(() => {
        gen.classList.remove("active");
        box.style.display = "block";
        box.value = messages[tone];
        clearMsgBoxHeight();
      }, 1400);
    } else {
      gen.classList.remove("active");
      box.style.display = "block";
      box.value = messages[tone];
      clearMsgBoxHeight();
    }
  }

  function init() {
    const openDraft = document.getElementById("openDraft");
    const aiWrap = document.getElementById("aiModalWrap");
    const closeAi = document.getElementById("closeAiModal");
    const closeAiFooter = document.getElementById("closeAiModalFooter");
    const regenBtn = document.getElementById("regenBtn");

    function setAiOpen(open) {
      if (!aiWrap) return;
      aiWrap.classList.toggle("active", open);
      aiWrap.setAttribute("aria-hidden", open ? "false" : "true");
    }

    openDraft?.addEventListener("click", () => {
      setAiOpen(true);
      showMessage(currentTone, true);
    });

    aiWrap?.addEventListener("click", (e) => {
      if (e.target === aiWrap) setAiOpen(false);
    });
    closeAi?.addEventListener("click", () => setAiOpen(false));
    closeAiFooter?.addEventListener("click", () => setAiOpen(false));

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (aiWrap?.classList.contains("active")) {
        e.preventDefault();
        setAiOpen(false);
      }
    });
    document.querySelectorAll(".tone-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tone-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentTone = btn.dataset.tone || "collaborative";
        showMessage(currentTone, true);
      });
    });
    regenBtn?.addEventListener("click", () => showMessage(currentTone, true));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
