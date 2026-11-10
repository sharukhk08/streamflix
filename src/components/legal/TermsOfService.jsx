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

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By using StreamFlix, you agree to these Terms of Service and our Privacy Policy. These terms govern your use of our service and outline your rights and responsibilities as a user.",
    },
    {
      title: "The StreamFlix Service",
      content:
        "StreamFlix provides a personalized streaming service that allows our members to watch a wide variety of movies, TV shows, and other content. Our service includes features such as personalized profiles, content recommendations, and multi-device streaming capabilities.",
    },
    {
      title: "Your StreamFlix Account",
      content:
        "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You can create multiple profiles within your account, including kids' profiles with content restrictions.",
    },
    {
      title: "Subscription and Billing",
      content:
        "Your StreamFlix membership will continue until terminated. To use the StreamFlix service, you must have Internet access and provide a current, valid, accepted method of payment, which you may update from time to time.",
    },
    {
      title: "Content and Copyrights",
      content:
        "All content available through StreamFlix is protected by copyright, trademark, and other intellectual property laws. You agree not to reproduce, distribute, modify, or create derivative works from this content unless expressly authorized by StreamFlix.",
    },
    {
      title: "Use of the Service",
      content:
        "You agree to use the StreamFlix service only for personal, non-commercial purposes. You will not share your account credentials, attempt to circumvent any technical measures we use to provide the service, or use the service in any way that violates applicable laws.",
    },
    {
      title: "Changes to the Service",
      content:
        "We continually update the StreamFlix service, including the content library. In addition, we continually test various aspects of our service, including our website, user interfaces, promotional features, and availability of content.",
    },
    {
      title: "Termination",
      content:
        "We reserve the right to terminate or restrict your use of our service without notice for any or no reason whatsoever. Upon termination, you must cease all use of the StreamFlix service.",
    },
    {
      title: "Changes to Terms of Service",
      content:
        "We may, from time to time, change these Terms of Service. We will notify you at least 30 days before such changes apply to you. Continued use of StreamFlix after changes to the Terms of Service constitutes acceptance of the updated terms.",
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
          StreamFlix Terms of Service
        </h1>

        <div className="flex gap-8">
          <aside className="w-1/4 flex-shrink-0">
            <TableOfContents
              sections={sections.map((s) => s.title)}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </aside>

          <main className="flex-grow">
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
                If you have any questions about these Terms of Service, please
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

export default TermsOfService;
