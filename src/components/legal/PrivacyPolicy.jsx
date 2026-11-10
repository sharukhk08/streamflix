import React, { useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TableOfContents = ({ sections, activeSection, setActiveSection }) => {
  return (
    <nav className="p-4 rounded-lg sticky top-8">
      <h2 className="text-xl font-semibold mb-4 text-[#00FF99]">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {sections.map((section, index) => (
          <li key={index}>
            <a
              href={`#section-${index + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(`section-${index + 1}`);
              }}
              className={`block py-1 px-2 rounded transition-colors ${
                activeSection === `section-${index + 1}`
                  ? "text-[#00FF99] font-semibold"
                  : "text-white hover:text-[#00FF99]"
              }`}>
              {index + 1}. {section}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: "Introduction",
      content:
        "This Privacy Policy explains how StreamFlix collects, uses, and protects your personal information when you use our streaming service.",
    },
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly, such as account details and viewing preferences, as well as automatically collected information like device data and usage statistics.",
    },
    {
      title: "How We Use Your Information",
      content:
        "Your information is used to provide and improve our service, personalize content recommendations, process payments, and communicate with you about our service and updates.",
    },
    {
      title: "Information Sharing and Disclosure",
      content:
        "We do not sell your personal information. We may share information with service providers, for legal reasons, or in the event of a business transfer.",
    },
    {
      title: "Your Choices and Rights",
      content:
        "You have the right to access, correct, or delete your personal information. You can also opt-out of certain data collection and use practices.",
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure.",
    },
    {
      title: "Children's Privacy",
      content:
        "Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or through our service.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at demo@example.com.",
    },
  ];

  return (
    <div className="text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-[36px] font-extrabold px-8 py-12 relative"
          style={{
            background:
              "linear-gradient(90deg, rgba(86, 72, 251, 1) 0%, rgba(0, 255, 153, 1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          StreamFlix Privacy Policy
        </h1>

        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="w-full flex-shrink-0 md:w-1/4">
            <TableOfContents
              sections={sections.map((s) => s.title)}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </aside>

          <main className="min-w-0 flex-grow">
            <article className="space-y-12">
              {sections.map((section, index) => (
                <section
                  key={index}
                  id={`section-${index + 1}`}
                  className="scroll-mt-8">
                  <h2
                    className="text-2xl font-semibold mb-4 flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      setActiveSection(
                        activeSection === `section-${index + 1}`
                          ? null
                          : `section-${index + 1}`
                      )
                    }>
                    <span>
                      {index + 1}. {section.title}
                    </span>
                    {activeSection === `section-${index + 1}` ? (
                      <FaChevronUp className="text-[#00FF99]" />
                    ) : (
                      <FaChevronDown />
                    )}
                  </h2>
                  <div
                    className={`transition-all duration-300 ${
                      activeSection === `section-${index + 1}`
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}>
                    <p className="mb-4">{section.content}</p>
                  </div>
                </section>
              ))}
            </article>

            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about our Privacy Policy, please
                contact us at{" "}
                <Link
                  href="mailto:demo@example.com"
                  className="text-[#00FF99] hover:underline">
                  demo@example.com
                </Link>
                .
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
