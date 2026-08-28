/**
 * Akshendra's Projects Data
 *
 * Supported formats:
 * - Pictures: .png, .jpg, .jpeg, .webp, .svg, or image URLs
 * - Videos: .mp4, .webm, Loom links, YouTube embed, or local video files
 *
 * mediaType: "image" or "video"
 * gallery: array of { type, url, title } — all clickable and expandable full screen
 */

const projectsData = [
  {
    id: "talentflow-ai-recruitment-agent",
    title: "TalentFlow AI — Recruitment Agent",
    category: "Automation · HR & Recruitment · AI Agent",
    badge: "AI Agent",
    mediaType: "image",
    mediaUrl: "assets/AI resume screening agent/make workflow.png",
    posterUrl: "assets/AI resume screening agent/make workflow.png",
    gallery: [
      { type: "image", url: "assets/AI resume screening agent/make workflow.png",          title: "Make.com Recruitment Workflow" },
      { type: "image", url: "assets/AI resume screening agent/n8n workflow.png",            title: "n8n Recruitment Workflow" },
      { type: "image", url: "assets/AI resume screening agent/Tally form.png",              title: "Tally Candidate Form" },
      { type: "image", url: "assets/AI resume screening agent/tally form page 2.png",       title: "Tally Candidate Form — Page 2" },
      { type: "image", url: "assets/AI resume screening agent/tally form page 3.png",       title: "Tally Candidate Form — Page 3" },
      { type: "image", url: "assets/AI resume screening agent/tally form page 4.png",       title: "Tally Candidate Form — Page 4" },
      { type: "image", url: "assets/AI resume screening agent/job requirement table.png",   title: "Job Requirements Table" },
      { type: "image", url: "assets/AI resume screening agent/candidate table.png",         title: "Candidate Scoring Table" },
      { type: "image", url: "assets/AI resume screening agent/application history table.png", title: "Application History Table" },
      { type: "image", url: "assets/AI resume screening agent/email.png",                   title: "Recruiter Executive Summary Email" }
    ],
    projectUrl: "#",
    problem: "Manually reviewing hundreds of resumes against job requirements creates severe hiring bottlenecks, inconsistent candidate evaluations, and delayed interview scheduling for high-priority talent.",
    solution: "Built a multi-agent recruitment pipeline across Make.com and n8n that triggers upon Tally form submission. The system extracts structured JSON from PDF resumes, uses Gemini AI to evaluate candidates against Airtable job criteria, performs skill-gap analysis, syncs scores to Airtable ATS, and automatically emails a recruiter-ready executive summary with customized interview questions.",
    result: "Resumes are parsed, scored, and categorized within moments of submission, giving hiring teams instant qualification briefs and structured candidate pipelines without manual screening.",
    tags: ["Make.com", "n8n", "Gemini AI", "Airtable", "Tally", "Gmail"]
  },
  {
    id: "smart-email-manager",
    title: "Smart Email Manager",
    category: "Automation · Email Management",
    badge: "Automation",
    mediaType: "image",
    mediaUrl: "assets/Smart email system/scenerio.png",
    posterUrl: "assets/Smart email system/scenerio.png",
    gallery: [
      { type: "video", url: "assets/Smart email system/smart email system video.mp4", title: "Live Demo — Smart Email Manager" },
      { type: "image", url: "assets/Smart email system/scenerio.png",       title: "Smart Email Manager Workflow" },
      { type: "image", url: "assets/Smart email system/lead.png",           title: "Lead Email Classification" },
      { type: "image", url: "assets/Smart email system/urgent.png",         title: "Urgent Email Classification" },
      { type: "image", url: "assets/Smart email system/general.png",         title: "General Email Classification" },
      { type: "image", url: "assets/Smart email system/spam mail.png",      title: "Spam Email Classification" },
      { type: "image", url: "assets/Smart email system/lead reply.png",     title: "AI-Generated Lead Reply" },
      { type: "image", url: "assets/Smart email system/google sheet.png",   title: "Email Interaction Log" },
      { type: "image", url: "assets/Smart email system/telegram alert.png", title: "Telegram Priority Alert" },
      { type: "image", url: "assets/Smart email system/reply detection.png", title: "Reply Detection Workflow" },
      { type: "image", url: "assets/Smart email system/follow up.png",      title: "Automated Follow-Up Workflow" }
    ],
    projectUrl: "#",
    problem: "Sorting through a crowded inbox manually causes slow responses, missed client inquiries, and critical alerts getting buried in spam. Tracking who replied and sending manual follow-ups also takes up unnecessary daily time.",
    solution: "Built an automated email pipeline using Make.com and Google Gemini AI that categorizes incoming emails as Lead, Urgent, General, or Spam. The system automatically sends a contextual AI reply via Gmail, logs the interaction in Google Sheets, sends instant Telegram alerts for high-priority emails, and runs companion workflows for reply detection and 2-day follow-ups.",
    result: "Inquiries receive tailored replies within minutes instead of hours, high-priority alerts reach the team instantly via Telegram, and follow-ups run reliably without manual inbox monitoring.",
    tags: ["Make.com", "Gemini AI", "Gmail", "Telegram Bot", "Google Sheets"]
  },
  {
    id: "ai-lead-capture-scoring",
    title: "AI Lead Capture & Scoring System",
    category: "Automation · Lead Generation",
    badge: "Automation",
    mediaType: "image",
    mediaUrl: "assets/Lead capture/workflow.png",
    posterUrl: "assets/Lead capture/workflow.png",
    gallery: [
      { type: "video", url: "assets/Lead capture/Lead Capture Automation video.mp4", title: "Live Demo — Full Automation Flow" },
      { type: "image", url: "assets/Lead capture/workflow.png",        title: "Make.com Workflow" },
      { type: "image", url: "assets/Lead capture/google sheet.png",    title: "Auto-Logged Leads in Google Sheets" },
      { type: "image", url: "assets/Lead capture/hot lead.png",        title: "Hot Lead Telegram Alert" },
      { type: "image", url: "assets/Lead capture/hot read replyy.png", title: "AI-Written Personalized Reply" }
    ],
    projectUrl: "#",
    problem: "Manually reviewing and replying to every inbound lead is slow and repetitive — gathering details, judging fit, and writing a reply by hand often takes businesses hours or even days. In that gap, leads go cold or move on to a competitor.",
    solution: "Built an end-to-end pipeline that triggers the moment a lead fills out a form (Tally), uses Gemini AI to analyze the submission, score the lead's quality, and generate a personalized reply, then simultaneously logs the lead in Google Sheets, emails the AI-written reply instantly via Gmail, and sends a real-time Telegram alert to the team with the lead's score and details.",
    result: "Leads now get a personalized reply within minutes instead of hours or days, every lead is automatically scored and logged with zero manual entry, and the team gets an instant alert (with lead score, budget, urgency, and pain point) so high-value leads can be prioritized and contacted the same day.",
    tags: ["Tally", "Make.com", "Gemini AI", "Telegram Bot", "Google Sheets", "Gmail"]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
