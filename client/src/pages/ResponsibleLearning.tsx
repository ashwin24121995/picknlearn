import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, AlertTriangle, Clock, Brain, Target, Shield } from "lucide-react";

export default function ResponsibleLearning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <Navigation />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="glass-card px-4 py-2 mb-4">
              <Heart className="w-4 h-4 mr-2 inline" />
              Learn Responsibly
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Responsible Learning
            </h1>
            <p className="text-xl text-gray-400">
              Guidelines for healthy, sustainable, and effective learning
            </p>
          </div>

          {/* Important Notice */}
          <Card className="glass-card border-orange-500/30 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-orange-400">Learn Smart, Play Responsibly</h3>
                  <p className="text-gray-300 leading-relaxed">
                    While Pick N Learn provides educational content about fantasy cricket, we strongly advocate for responsible participation in fantasy sports. Set limits, maintain balance, and never risk more than you can afford to lose.
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    <strong className="text-white">Remember:</strong> Fantasy sports should be entertainment, not a source of income or financial stress.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="space-y-6">
            
            {/* Healthy Learning Habits */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <CardTitle className="text-2xl text-white">Healthy Learning Habits</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Build sustainable learning practices for long-term success
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">1. Set Realistic Learning Goals</h4>
                  <p className="leading-relaxed mb-3">
                    Effective learning requires clear, achievable objectives. Instead of trying to master everything at once, break your learning journey into manageable milestones:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Start with fundamentals:</strong> Master basic concepts before moving to advanced strategies</li>
                    <li><strong className="text-white">Set weekly targets:</strong> Complete 2-3 lessons per week at a comfortable pace</li>
                    <li><strong className="text-white">Track your progress:</strong> Use the dashboard to monitor achievements and identify knowledge gaps</li>
                    <li><strong className="text-white">Celebrate small wins:</strong> Acknowledge each completed lesson and quiz milestone</li>
                    <li><strong className="text-white">Review regularly:</strong> Revisit previous lessons to reinforce learning</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">2. Maintain a Balanced Schedule</h4>
                  <p className="leading-relaxed mb-3">
                    Learning should enhance your life, not consume it. Create a sustainable study routine:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Dedicate specific time slots:</strong> 30-60 minutes per session is ideal for retention</li>
                    <li><strong className="text-white">Take regular breaks:</strong> Use the Pomodoro technique (25 min study, 5 min break)</li>
                    <li><strong className="text-white">Avoid marathon sessions:</strong> Spread learning over multiple days rather than cramming</li>
                    <li><strong className="text-white">Balance with other activities:</strong> Maintain work, family, and social commitments</li>
                    <li><strong className="text-white">Get adequate sleep:</strong> Rest is crucial for memory consolidation and cognitive function</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">3. Practice Active Learning</h4>
                  <p className="leading-relaxed mb-3">
                    Passive reading is less effective than active engagement. Maximize retention through:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Take notes:</strong> Summarize key concepts in your own words</li>
                    <li><strong className="text-white">Complete all quizzes:</strong> Test your understanding regularly</li>
                    <li><strong className="text-white">Apply knowledge:</strong> Analyze real matches using learned strategies (without real money)</li>
                    <li><strong className="text-white">Teach others:</strong> Explaining concepts reinforces your understanding</li>
                    <li><strong className="text-white">Ask questions:</strong> Engage with the community and seek clarification</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">4. Avoid Information Overload</h4>
                  <p className="leading-relaxed mb-3">
                    Too much information at once can be counterproductive. Manage cognitive load by:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Focus on one topic at a time:</strong> Complete a lesson fully before starting another</li>
                    <li><strong className="text-white">Limit daily intake:</strong> 1-2 lessons per day maximum</li>
                    <li><strong className="text-white">Prioritize quality over quantity:</strong> Deep understanding beats surface-level coverage</li>
                    <li><strong className="text-white">Use bookmarks:</strong> Save lessons for later review rather than rushing through</li>
                    <li><strong className="text-white">Recognize mental fatigue:</strong> Stop when concentration wanes</li>
                  </ul>
                </div>

              </CardContent>
            </Card>

            {/* Time Management */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-blue-400" />
                  <CardTitle className="text-2xl text-white">Time Management</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Balance learning with other life priorities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Recommended Time Allocation</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white">Beginners (Weeks 1-4)</span>
                        <span className="text-blue-400 font-bold">3-4 hours/week</span>
                      </div>
                      <p className="text-sm text-gray-400">Focus on fundamentals, complete 2-3 lessons weekly, take all quizzes</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white">Intermediate (Weeks 5-12)</span>
                        <span className="text-green-400 font-bold">2-3 hours/week</span>
                      </div>
                      <p className="text-sm text-gray-400">Advanced strategies, review previous content, practice analysis</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white">Advanced (Ongoing)</span>
                        <span className="text-purple-400 font-bold">1-2 hours/week</span>
                      </div>
                      <p className="text-sm text-gray-400">Stay updated, refine strategies, periodic review</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Warning Signs of Excessive Learning</h4>
                  <p className="leading-relaxed mb-3">
                    If you experience any of the following, consider reducing your learning time:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-yellow-400">
                    <li>Neglecting work, studies, or family responsibilities</li>
                    <li>Losing sleep to complete lessons</li>
                    <li>Feeling anxious or stressed about progress</li>
                    <li>Declining performance in other areas of life</li>
                    <li>Physical symptoms like headaches or eye strain</li>
                    <li>Loss of interest in other hobbies and activities</li>
                  </ul>
                  <p className="leading-relaxed mt-4 text-white font-semibold">
                    Remember: This is educational content, not a race. Learn at your own pace.
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* Responsible Fantasy Sports Participation */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-green-400" />
                  <CardTitle className="text-2xl text-white">Responsible Fantasy Sports Participation</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Guidelines for safe and enjoyable fantasy sports engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <p className="leading-relaxed font-semibold text-orange-400">
                    <AlertTriangle className="w-5 h-5 inline mr-2" />
                    Important: Pick N Learn is an educational platform only. We do not operate fantasy sports contests or handle real money. The following guidelines apply if you choose to participate in fantasy sports on external platforms.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">1. Set Financial Limits</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Budget strictly:</strong> Only use disposable income you can afford to lose</li>
                    <li><strong className="text-white">Set daily/weekly limits:</strong> Establish maximum spending amounts and stick to them</li>
                    <li><strong className="text-white">Never chase losses:</strong> Don't increase spending to recover previous losses</li>
                    <li><strong className="text-white">Avoid borrowing:</strong> Never use credit cards, loans, or borrowed money</li>
                    <li><strong className="text-white">Track expenses:</strong> Monitor all fantasy sports spending carefully</li>
                    <li><strong className="text-white">Separate funds:</strong> Keep fantasy sports money separate from essential expenses</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">2. Maintain Perspective</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">It's entertainment, not income:</strong> Treat fantasy sports as a hobby, not a job</li>
                    <li><strong className="text-white">Accept losses:</strong> Losing is part of the game; don't let it affect your mood</li>
                    <li><strong className="text-white">Celebrate wins modestly:</strong> Don't let success lead to overconfidence or increased risk</li>
                    <li><strong className="text-white">Understand variance:</strong> Short-term results don't reflect skill; focus on long-term improvement</li>
                    <li><strong className="text-white">No guaranteed wins:</strong> Even the best strategies can fail due to unpredictability</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">3. Recognize Problem Behaviors</h4>
                  <p className="leading-relaxed mb-3 text-yellow-400 font-semibold">
                    Seek help immediately if you experience any of these warning signs:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-yellow-400">
                    <li>Spending more money than you can afford</li>
                    <li>Lying to family or friends about fantasy sports participation</li>
                    <li>Feeling anxious, depressed, or irritable when not participating</li>
                    <li>Neglecting work, studies, or relationships</li>
                    <li>Constantly thinking about fantasy sports or upcoming contests</li>
                    <li>Trying to win back losses by increasing spending</li>
                    <li>Borrowing money or selling possessions to fund participation</li>
                    <li>Experiencing financial difficulties due to fantasy sports</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">4. Take Regular Breaks</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Scheduled breaks:</strong> Take at least one week off every month</li>
                    <li><strong className="text-white">Off-season rest:</strong> Use cricket off-seasons to completely disconnect</li>
                    <li><strong className="text-white">Self-exclusion:</strong> Use platform self-exclusion features if needed</li>
                    <li><strong className="text-white">Diversify interests:</strong> Maintain hobbies unrelated to fantasy sports</li>
                    <li><strong className="text-white">Social connections:</strong> Spend time with family and friends offline</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">5. Legal and Age Compliance</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Age requirement:</strong> You must be 18+ to participate in fantasy sports</li>
                    <li><strong className="text-white">Verify local laws:</strong> Ensure fantasy sports are legal in your jurisdiction</li>
                    <li><strong className="text-white">State restrictions:</strong> Do not participate if you reside in restricted states (Assam, Odisha, Telangana, Andhra Pradesh, Sikkim, Nagaland)</li>
                    <li><strong className="text-white">Platform compliance:</strong> Only use licensed, regulated fantasy sports platforms</li>
                    <li><strong className="text-white">Tax obligations:</strong> Report winnings as required by tax laws</li>
                  </ul>
                </div>

              </CardContent>
            </Card>

            {/* Mental Health and Well-being */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-pink-400" />
                  <CardTitle className="text-2xl text-white">Mental Health and Well-being</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Prioritize your mental health while learning and participating
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Stress Management</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Don't let results define you:</strong> Your worth isn't determined by fantasy sports performance</li>
                    <li><strong className="text-white">Practice mindfulness:</strong> Stay present and avoid obsessing over outcomes</li>
                    <li><strong className="text-white">Seek support:</strong> Talk to friends, family, or professionals if feeling overwhelmed</li>
                    <li><strong className="text-white">Maintain routines:</strong> Keep regular sleep, exercise, and eating habits</li>
                    <li><strong className="text-white">Recognize triggers:</strong> Identify situations that cause stress and develop coping strategies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">When to Seek Professional Help</h4>
                  <p className="leading-relaxed mb-3">
                    Consider consulting a mental health professional or addiction counselor if:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-pink-400">
                    <li>Fantasy sports participation is causing significant distress</li>
                    <li>You're unable to control your spending or time investment</li>
                    <li>Relationships are suffering due to fantasy sports involvement</li>
                    <li>You're experiencing depression, anxiety, or suicidal thoughts</li>
                    <li>You've tried to quit but can't</li>
                  </ul>
                </div>

                <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-3">Helpline Resources</h4>
                  <p className="leading-relaxed mb-3">
                    If you or someone you know is struggling with gambling addiction or mental health issues:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li><strong className="text-white">National Problem Gambling Helpline (India):</strong> Available through various state-specific services</li>
                    <li><strong className="text-white">Mental Health Helpline:</strong> KIRAN (1800-599-0019) - Available 24/7</li>
                    <li><strong className="text-white">Vandrevala Foundation:</strong> 1860-2662-345 / 1800-2333-330</li>
                  </ul>
                  <p className="leading-relaxed mt-3 text-pink-400 font-semibold">
                    Remember: Seeking help is a sign of strength, not weakness.
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* Platform Commitment */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <CardTitle className="text-2xl text-white">Our Commitment to Responsible Learning</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  How Pick N Learn promotes healthy learning practices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                
                <p className="leading-relaxed">
                  Pick N Learn is committed to providing educational content in a responsible manner. We:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Promote education, not gambling:</strong> Focus solely on skill development and knowledge</li>
                  <li><strong className="text-white">Enforce age restrictions:</strong> Require users to be 18+ years old</li>
                  <li><strong className="text-white">Provide clear disclaimers:</strong> Emphasize that fantasy sports involve risk</li>
                  <li><strong className="text-white">Encourage responsible practices:</strong> Regularly remind users about healthy participation</li>
                  <li><strong className="text-white">Respect geographic restrictions:</strong> Acknowledge state-specific regulations</li>
                  <li><strong className="text-white">Offer progress tracking:</strong> Help users learn at their own pace without pressure</li>
                  <li><strong className="text-white">Provide resources:</strong> Link to support services and helplines</li>
                  <li><strong className="text-white">No real-money operations:</strong> We don't facilitate betting or gambling</li>
                </ul>

                <div className="border-t border-gray-700 pt-6 mt-6">
                  <p className="leading-relaxed font-semibold text-white">
                    Your well-being is our priority. Learn responsibly, participate wisely, and remember that education is a journey, not a destination.
                  </p>
                </div>

              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
