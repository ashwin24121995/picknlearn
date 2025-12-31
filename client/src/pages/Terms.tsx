import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="glass-card px-4 py-2 mb-4">
              <FileText className="w-4 h-4 mr-2 inline" />
              Legal Agreement
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-400">
              Please read these terms carefully before using Pick N Learn
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: January 1, 2026
            </p>
          </div>

          {/* Important Notice */}
          <Card className="glass-card border-yellow-500/30 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-yellow-400">Important Notice</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">18+ Only:</strong> You must be at least 18 years of age to use this platform.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">State Restrictions:</strong> This educational platform's content may not be applicable or legal for residents of <strong className="text-yellow-400">Assam, Odisha, Telangana, Andhra Pradesh, Sikkim, and Nagaland</strong>. Users from these states should verify local laws before proceeding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Content */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Terms of Service</CardTitle>
              <CardDescription className="text-gray-400">
                By accessing Pick N Learn, you agree to these terms
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none space-y-8 text-gray-300">
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h3>
                <p className="leading-relaxed">
                  By accessing and using Pick N Learn ("the Platform", "we", "us", "our"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must not use the Platform. We reserve the right to modify, update, or change these terms at any time without prior notice. Your continued use of the Platform after such changes constitutes your acceptance of the new terms.
                </p>
                <p className="leading-relaxed mt-3">
                  It is your responsibility to review these terms periodically. We will indicate the date of the most recent update at the top of this page. Material changes will be communicated through prominent notices on the Platform or via email to registered users.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">2. Platform Purpose and Scope</h3>
                <p className="leading-relaxed">
                  Pick N Learn is an educational platform designed exclusively to teach fantasy cricket strategies, player analysis techniques, team-building concepts, and related skills. The Platform provides:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Comprehensive lessons on fantasy cricket fundamentals and advanced strategies</li>
                  <li>Interactive quizzes to test knowledge and understanding</li>
                  <li>Glossary of fantasy cricket terms and concepts</li>
                  <li>Progress tracking and achievement systems</li>
                  <li>Educational resources and best practices</li>
                </ul>
                <p className="leading-relaxed mt-3 font-semibold text-yellow-400">
                  Important: The Platform does NOT operate, facilitate, endorse, or provide access to any real-money fantasy sports contests, gambling activities, betting services, or gaming platforms. All content is provided solely for educational and informational purposes.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">3. Age Restrictions</h3>
                <p className="leading-relaxed">
                  <strong className="text-white">You must be at least 18 years of age to use this Platform.</strong> By using the Platform, you represent and warrant that you are 18 years or older. We do not knowingly collect personal information from individuals under 18 years of age.
                </p>
                <p className="leading-relaxed mt-3">
                  If we discover that a user under 18 has provided us with personal information, we will immediately delete such information and terminate the account. Parents and guardians are responsible for monitoring their children's internet usage.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">4. Geographic Restrictions</h3>
                <p className="leading-relaxed">
                  Fantasy sports regulations vary by jurisdiction. The content on this Platform may not be applicable, appropriate, or legal for residents of certain Indian states, specifically:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-yellow-400 font-semibold">
                  <li>Assam</li>
                  <li>Odisha</li>
                  <li>Telangana</li>
                  <li>Andhra Pradesh</li>
                  <li>Sikkim</li>
                  <li>Nagaland</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Users from these states are advised to verify local laws and regulations before using the Platform or applying any learned strategies. We do not encourage or endorse any activities that may be illegal in your jurisdiction. It is your sole responsibility to ensure compliance with all applicable local, state, and national laws.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">5. User Account and Registration</h3>
                <p className="leading-relaxed mb-3">
                  To access certain features of the Platform, you may be required to create an account. When creating an account, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security and confidentiality of your login credentials</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Not share your account with others or create multiple accounts</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  We reserve the right to suspend or terminate accounts that violate these terms, provide false information, or engage in suspicious or fraudulent activities.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">6. User Conduct and Prohibited Activities</h3>
                <p className="leading-relaxed mb-3">
                  Users of the Platform agree to use it only for lawful, educational purposes. The following activities are strictly prohibited:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violating any applicable local, state, national, or international laws or regulations</li>
                  <li>Attempting to gain unauthorized access to the Platform, other accounts, or computer systems</li>
                  <li>Engaging in any form of hacking, data mining, or automated data extraction</li>
                  <li>Uploading viruses, malware, or any harmful code</li>
                  <li>Harassing, threatening, or abusing other users</li>
                  <li>Impersonating any person or entity</li>
                  <li>Reproducing, distributing, or commercially exploiting Platform content without permission</li>
                  <li>Using the Platform to promote illegal gambling or betting activities</li>
                  <li>Reverse engineering or attempting to extract source code</li>
                  <li>Interfering with or disrupting Platform operations</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Violation of these prohibitions may result in immediate account termination and legal action.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">7. Intellectual Property Rights</h3>
                <p className="leading-relaxed">
                  All content on the Platform, including but not limited to text, graphics, logos, images, videos, audio, software, code, and design elements, is the exclusive property of Pick N Learn or its content suppliers and is protected by copyright, trademark, patent, and other intellectual property laws.
                </p>
                <p className="leading-relaxed mt-3">
                  <strong className="text-white">Limited License:</strong> We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform and its content for personal, non-commercial educational purposes only. This license does not include the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Reproduce, duplicate, copy, or redistribute content</li>
                  <li>Modify, adapt, or create derivative works</li>
                  <li>Sell, rent, lease, or sublicense content</li>
                  <li>Use content for commercial purposes</li>
                  <li>Remove or alter copyright notices or attributions</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Any unauthorized use of Platform content may violate copyright, trademark, and other laws and may result in criminal or civil penalties.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">8. User-Generated Content</h3>
                <p className="leading-relaxed">
                  If the Platform allows you to submit, post, or share content (such as comments, reviews, forum posts, or feedback), you retain ownership of your content but grant Pick N Learn a worldwide, non-exclusive, royalty-free, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in any media.
                </p>
                <p className="leading-relaxed mt-3">
                  By submitting content, you represent and warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>You own or have the necessary rights to the content</li>
                  <li>The content does not violate any third-party rights (copyright, trademark, privacy, publicity)</li>
                  <li>The content does not contain illegal, harmful, or offensive material</li>
                  <li>The content complies with all applicable laws and these Terms</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  We reserve the right to remove, edit, or refuse any user-generated content that violates these Terms or is deemed inappropriate, without notice or liability.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">9. Disclaimers and Limitations of Warranties</h3>
                <p className="leading-relaxed mb-3">
                  <strong className="text-white">THE PLATFORM AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong> To the fullest extent permitted by law, Pick N Learn disclaims all warranties, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                  <li>Accuracy, completeness, reliability, or timeliness of content</li>
                  <li>Uninterrupted, secure, or error-free operation</li>
                  <li>Freedom from viruses or harmful components</li>
                  <li>Results or outcomes from using the Platform or applying learned strategies</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  <strong className="text-yellow-400">No Guarantee of Results:</strong> We do not guarantee that the strategies, methods, or information provided on the Platform will lead to success in fantasy sports or any other endeavor. Past performance and examples do not guarantee future results.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">10. Limitation of Liability</h3>
                <p className="leading-relaxed mb-3">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, PICK N LEARN, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Loss of profits, revenue, or business opportunities</li>
                  <li>Loss of data or information</li>
                  <li>Loss of goodwill or reputation</li>
                  <li>Financial losses from fantasy sports participation</li>
                  <li>Decisions made based on Platform content</li>
                  <li>Unauthorized access to or alteration of your data</li>
                  <li>Third-party conduct or content</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  This limitation applies even if we have been advised of the possibility of such damages. Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so these limitations may not apply to you.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">11. Indemnification</h3>
                <p className="leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Pick N Learn, its affiliates, officers, directors, employees, agents, partners, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Your use or misuse of the Platform</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                  <li>Your violation of any applicable laws or regulations</li>
                  <li>Any content you submit or share on the Platform</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">12. Third-Party Links and Services</h3>
                <p className="leading-relaxed">
                  The Platform may contain links to third-party websites, services, or resources. These links are provided for convenience only. We have no control over third-party sites and are not responsible for their content, privacy practices, accuracy, or availability.
                </p>
                <p className="leading-relaxed mt-3">
                  Inclusion of any link does not imply endorsement, recommendation, or affiliation. You access third-party sites at your own risk and should review their terms and privacy policies.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">13. Termination</h3>
                <p className="leading-relaxed">
                  We reserve the right to suspend, disable, or terminate your access to the Platform at any time, with or without cause, with or without notice, for any reason including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent, abusive, or illegal activity</li>
                  <li>Extended periods of inactivity</li>
                  <li>Technical or security reasons</li>
                  <li>At our sole discretion</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Upon termination, your right to use the Platform will immediately cease. You must destroy all copies of Platform content in your possession. Sections of these Terms that by their nature should survive termination will survive, including intellectual property provisions, disclaimers, and limitations of liability.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">14. Modifications to the Platform</h3>
                <p className="leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time, including features, content, or availability, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Platform.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">15. Governing Law and Dispute Resolution</h3>
                <p className="leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any disputes arising from these Terms or use of the Platform shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996.
                </p>
                <p className="leading-relaxed mt-3">
                  You agree to waive any right to a jury trial or to participate in a class action lawsuit. The arbitration shall be conducted in English, and the arbitrator's decision shall be final and binding.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">16. Severability</h3>
                <p className="leading-relaxed">
                  If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">17. Entire Agreement</h3>
                <p className="leading-relaxed">
                  These Terms, together with our Privacy Policy and any other legal notices published on the Platform, constitute the entire agreement between you and Pick N Learn regarding your use of the Platform and supersede all prior agreements and understandings.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">18. Contact Information</h3>
                <p className="leading-relaxed">
                  For questions, concerns, or feedback regarding these Terms and Conditions, please contact us through the Platform's contact form or support channels. We will respond to inquiries within a reasonable timeframe.
                </p>
              </section>

              <section className="border-t border-gray-700 pt-6 mt-8">
                <p className="text-sm text-gray-400 leading-relaxed">
                  By using Pick N Learn, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you must immediately discontinue use of the Platform.
                </p>
              </section>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
