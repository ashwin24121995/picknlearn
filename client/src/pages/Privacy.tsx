import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="glass-card px-4 py-2 mb-4">
              <Shield className="w-4 h-4 mr-2 inline" />
              Your Privacy Matters
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-400">
              How we collect, use, and protect your personal information
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: January 1, 2026
            </p>
          </div>

          {/* Important Notice */}
          <Card className="glass-card border-blue-500/30 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-blue-400">Your Data, Your Rights</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We are committed to protecting your privacy and ensuring transparency in how we handle your personal information. This policy explains what data we collect, why we collect it, and how you can control your information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Content */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Privacy Policy</CardTitle>
              <CardDescription className="text-gray-400">
                Understanding how Pick N Learn handles your data
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none space-y-8 text-gray-300">
              
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h3>
                <p className="leading-relaxed mb-4">
                  We collect different types of information to provide and improve our services. The information we collect falls into the following categories:
                </p>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">1.1 Personal Information You Provide</h4>
                <p className="leading-relaxed mb-2">When you create an account or interact with the Platform, you may provide:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Account Information:</strong> Name, email address, username, password</li>
                  <li><strong className="text-white">Profile Information:</strong> Optional profile picture, bio, preferences</li>
                  <li><strong className="text-white">Communication Data:</strong> Messages, feedback, support inquiries</li>
                  <li><strong className="text-white">Survey Responses:</strong> Feedback and opinions you choose to share</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">1.2 Usage and Activity Information</h4>
                <p className="leading-relaxed mb-2">We automatically collect information about how you use the Platform:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Learning Progress:</strong> Lessons completed, quiz scores, time spent on content</li>
                  <li><strong className="text-white">Interaction Data:</strong> Bookmarks, achievements unlocked, search queries</li>
                  <li><strong className="text-white">Performance Analytics:</strong> Learning patterns, areas of difficulty, completion rates</li>
                  <li><strong className="text-white">Navigation Data:</strong> Pages visited, features used, click patterns</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">1.3 Technical and Device Information</h4>
                <p className="leading-relaxed mb-2">We collect technical data to ensure Platform functionality and security:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Device Information:</strong> Device type, operating system, browser type and version</li>
                  <li><strong className="text-white">Network Information:</strong> IP address, internet service provider, general location (city/region)</li>
                  <li><strong className="text-white">Log Data:</strong> Access times, error logs, crash reports</li>
                  <li><strong className="text-white">Cookies and Tracking:</strong> Session identifiers, preferences, authentication tokens</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h3>
                <p className="leading-relaxed mb-4">
                  We use the collected information for specific, legitimate purposes to provide, improve, and protect our services:
                </p>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">2.1 Platform Operation and Service Delivery</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create and manage your account</li>
                  <li>Authenticate your identity and maintain session security</li>
                  <li>Provide access to lessons, quizzes, and educational content</li>
                  <li>Track your learning progress and achievements</li>
                  <li>Enable bookmarking and personalization features</li>
                  <li>Process and respond to your inquiries and support requests</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">2.2 Personalization and Improvement</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Customize content and recommendations based on your learning history</li>
                  <li>Suggest relevant lessons and learning paths</li>
                  <li>Adapt difficulty levels based on your performance</li>
                  <li>Remember your preferences and settings</li>
                  <li>Provide personalized dashboard and statistics</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">2.3 Analytics and Platform Enhancement</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Analyze usage patterns to improve user experience</li>
                  <li>Identify popular content and areas needing improvement</li>
                  <li>Measure Platform performance and effectiveness</li>
                  <li>Conduct research and development for new features</li>
                  <li>Generate aggregated, anonymized statistics and insights</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">2.4 Communication</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Send important Platform updates and announcements</li>
                  <li>Notify you of new lessons, features, or achievements</li>
                  <li>Respond to your questions and provide customer support</li>
                  <li>Send educational content and tips (with your consent)</li>
                  <li>Request feedback and conduct surveys</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">2.5 Security and Fraud Prevention</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Detect and prevent fraudulent activities and security threats</li>
                  <li>Monitor for unauthorized access and abuse</li>
                  <li>Enforce our Terms and Conditions</li>
                  <li>Protect the rights, property, and safety of users and the Platform</li>
                  <li>Comply with legal obligations and law enforcement requests</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">3. Information Sharing and Disclosure</h3>
                <p className="leading-relaxed mb-4 font-semibold text-green-400">
                  We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                </p>
                <p className="leading-relaxed mb-4">
                  We may share your information only in the following limited circumstances:
                </p>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">3.1 Service Providers</h4>
                <p className="leading-relaxed mb-2">
                  We work with trusted third-party service providers who assist in Platform operations:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Hosting Providers:</strong> Cloud infrastructure and server management</li>
                  <li><strong className="text-white">Analytics Services:</strong> Usage analysis and performance monitoring</li>
                  <li><strong className="text-white">Email Services:</strong> Transactional and notification emails</li>
                  <li><strong className="text-white">Authentication Providers:</strong> Secure login and identity verification</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  These providers are contractually obligated to protect your data, use it only for specified purposes, and comply with applicable privacy laws.
                </p>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">3.2 Legal Requirements</h4>
                <p className="leading-relaxed mb-2">
                  We may disclose your information when required by law or to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Comply with legal obligations, court orders, or government requests</li>
                  <li>Enforce our Terms and Conditions and other agreements</li>
                  <li>Protect the rights, property, or safety of Pick N Learn, users, or the public</li>
                  <li>Detect, prevent, or address fraud, security, or technical issues</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">3.3 Business Transfers</h4>
                <p className="leading-relaxed">
                  In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the acquiring entity. We will notify you of such changes and provide options regarding your data.
                </p>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">3.4 Aggregated and Anonymized Data</h4>
                <p className="leading-relaxed">
                  We may share aggregated, anonymized data that cannot identify you personally for research, marketing, analytics, or other purposes. This data does not contain any personally identifiable information.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">4. Data Security</h3>
                <p className="leading-relaxed mb-4">
                  We implement robust security measures to protect your information from unauthorized access, alteration, disclosure, or destruction:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Encryption:</strong> Data transmission is encrypted using industry-standard SSL/TLS protocols</li>
                  <li><strong className="text-white">Secure Storage:</strong> Personal data is stored on secure servers with restricted access</li>
                  <li><strong className="text-white">Access Controls:</strong> Strict authentication and authorization mechanisms</li>
                  <li><strong className="text-white">Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
                  <li><strong className="text-white">Employee Training:</strong> Staff are trained on data protection and privacy practices</li>
                  <li><strong className="text-white">Incident Response:</strong> Procedures in place to respond to security breaches</li>
                </ul>
                <p className="leading-relaxed mt-4 text-yellow-400">
                  <strong>Important:</strong> While we implement strong security measures, no method of transmission or storage is 100% secure. We cannot guarantee absolute security, and you use the Platform at your own risk.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">5. Your Privacy Rights and Choices</h3>
                <p className="leading-relaxed mb-4">
                  You have significant control over your personal information. Your rights include:
                </p>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">5.1 Access and Portability</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Request a copy of the personal information we hold about you</li>
                  <li>Receive your data in a structured, machine-readable format</li>
                  <li>Transfer your data to another service (data portability)</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">5.2 Correction and Update</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Update or correct inaccurate or incomplete information</li>
                  <li>Modify your profile and account settings</li>
                  <li>Change your email preferences and communication settings</li>
                </ul>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">5.3 Deletion and Erasure</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Request deletion of your account and associated data</li>
                  <li>Remove specific information from your profile</li>
                  <li>Withdraw consent for data processing (where applicable)</li>
                </ul>
                <p className="leading-relaxed mt-3 text-sm text-gray-400">
                  Note: Some information may be retained for legal, security, or legitimate business purposes even after deletion requests.
                </p>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">5.4 Communication Preferences</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Opt out of marketing and promotional emails</li>
                  <li>Unsubscribe from newsletters and updates</li>
                  <li>Control notification preferences</li>
                </ul>
                <p className="leading-relaxed mt-3 text-sm text-gray-400">
                  Note: You cannot opt out of essential service communications (e.g., account security alerts, Terms updates).
                </p>

                <h4 className="text-lg font-semibold text-white mt-6 mb-3">5.5 Cookie Management</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Control cookie preferences through browser settings</li>
                  <li>Block or delete cookies at any time</li>
                  <li>Use privacy-focused browser extensions</li>
                </ul>
                <p className="leading-relaxed mt-3 text-sm text-gray-400">
                  Note: Blocking essential cookies may affect Platform functionality.
                </p>

                <p className="leading-relaxed mt-6 font-semibold text-white">
                  To exercise any of these rights, please contact us through the Platform's support channels. We will respond to requests within 30 days.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">6. Data Retention</h3>
                <p className="leading-relaxed mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Active Accounts:</strong> Data is retained while your account is active</li>
                  <li><strong className="text-white">Inactive Accounts:</strong> Data may be deleted after extended periods of inactivity (typically 2-3 years)</li>
                  <li><strong className="text-white">Deleted Accounts:</strong> Most data is deleted within 90 days of account deletion</li>
                  <li><strong className="text-white">Legal Retention:</strong> Some data may be retained longer for legal, tax, or security purposes</li>
                  <li><strong className="text-white">Backup Systems:</strong> Data in backup systems may persist for up to 90 days after deletion</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">7. Children's Privacy</h3>
                <p className="leading-relaxed mb-4">
                  <strong className="text-white">The Platform is intended for users 18 years of age and older.</strong> We do not knowingly collect personal information from individuals under 18 years of age.
                </p>
                <p className="leading-relaxed">
                  If we discover that we have inadvertently collected information from someone under 18, we will delete that information immediately. If you believe a minor has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">8. International Data Transfers</h3>
                <p className="leading-relaxed mb-4">
                  Your information may be transferred to, stored, and processed in countries other than your country of residence, including countries that may have different data protection laws.
                </p>
                <p className="leading-relaxed">
                  When we transfer data internationally, we ensure appropriate safeguards are in place, such as:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Standard contractual clauses approved by regulatory authorities</li>
                  <li>Data processing agreements with service providers</li>
                  <li>Compliance with applicable data protection regulations</li>
                  <li>Encryption and security measures during transfer</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">9. Cookies and Tracking Technologies</h3>
                <p className="leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience and collect usage information. Types of cookies we use:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Essential Cookies:</strong> Required for Platform functionality (authentication, security)</li>
                  <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong className="text-white">Analytics Cookies:</strong> Help us understand usage patterns and improve the Platform</li>
                  <li><strong className="text-white">Performance Cookies:</strong> Monitor Platform performance and load times</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  You can control cookies through your browser settings. Note that blocking certain cookies may affect Platform functionality.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">10. Third-Party Services and Links</h3>
                <p className="leading-relaxed">
                  The Platform may contain links to third-party websites or integrate with third-party services. This Privacy Policy does not apply to those external sites or services. We are not responsible for the privacy practices of third parties. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">11. Changes to This Privacy Policy</h3>
                <p className="leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make significant changes, we will:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Update the "Last Updated" date at the top of this policy</li>
                  <li>Post a prominent notice on the Platform</li>
                  <li>Send an email notification to registered users (for material changes)</li>
                  <li>Provide a summary of key changes</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Your continued use of the Platform after changes take effect constitutes acceptance of the updated policy. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mb-4">12. Contact Us</h3>
                <p className="leading-relaxed mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us through:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Platform contact form or support channels</li>
                  <li>Email support (available through your account dashboard)</li>
                  <li>In-app messaging system</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  We will respond to privacy inquiries within 30 days and work to address your concerns promptly and transparently.
                </p>
              </section>

              <section className="border-t border-gray-700 pt-6 mt-8">
                <p className="text-sm text-gray-400 leading-relaxed">
                  By using Pick N Learn, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as described herein.
                </p>
              </section>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
