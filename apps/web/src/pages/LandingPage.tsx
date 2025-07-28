import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles, Code, BarChart3, Users, Clock, TrendingUp, Star, CheckCircle, PlayCircle, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import { 
  RealtimeActivity, 
  ScarcityCountdown, 
  TestimonialCarousel, 
  SuccessCases, 
  TrustBadges 
} from '@/components/MarketingElements';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [quickIdea, setQuickIdea] = useState('');

  const features = [
    {
      icon: MessageSquare,
      title: '30分钟想法验证',
      description: '通过AI对话快速验证商业想法可行性，比传统调研快10倍',
      metric: '10x faster'
    },
    {
      icon: Sparkles,
      title: '专业文档自动生成',
      description: '自动生成PRD、技术方案、项目计划，质量媲美资深产品经理',
      metric: '99% accuracy'
    },
    {
      icon: Code,
      title: '可执行代码输出',
      description: '直接生成可运行的项目代码，从想法到MVP只需1天',
      metric: '1-day MVP'
    },
    {
      icon: BarChart3,
      title: '全流程项目管理',
      description: '智能分解任务、评估风险、制定里程碑，确保项目成功',
      metric: '98% success'
    },
  ];

  // 成功案例数据
  const successStats = [
    { number: '500+', label: '成功项目', icon: CheckCircle },
    { number: '50+', label: '企业客户', icon: Users },
    { number: '30分钟', label: '平均验证时间', icon: Clock },
    { number: '95%', label: '用户满意度', icon: Star },
  ];

  return (
    <div className="pt-20">
      {/* 实时活动提示 */}
      <RealtimeActivity />
      
      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 社会化证明标签 */}
            <motion.div
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">已帮助500+项目成功落地</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </motion.div>

            {/* 主标题 - 更加情感化和结果导向 */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-white">你的创意</span>
              <span className="text-gradient block">30分钟变现实</span>
            </h1>
            
            {/* 副标题 - 强调结果和时间价值 */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              不懂技术？没关系！DeepNeed让任何人都能将想法快速转化为可执行的产品方案。
              <span className="text-emerald-400 font-semibold">平均30分钟完成需求分析，1天构建MVP。</span>
            </p>
            
            {/* 快速价值验证输入 - 重新设计为更吸引人的形式 */}
            {isAuthenticated ? (
              <motion.div
                className="max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gradient-to-r from-purple-500/10 via-transparent to-emerald-500/10 p-1 rounded-2xl">
                  <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 text-center">
                      🚀 立即开始你的创业之旅
                    </h3>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log('提交表单，quickIdea:', quickIdea);
                        if (quickIdea.trim()) {
                          console.log('跳转到/chat，传递initialIdea:', quickIdea.trim());
                          navigate('/chat', { state: { initialIdea: quickIdea.trim() } });
                        } else {
                          console.log('跳转到/chat，无initialIdea');
                          navigate('/chat');
                        }
                      }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <input
                        type="text"
                        value={quickIdea}
                        onChange={(e) => setQuickIdea(e.target.value)}
                        placeholder="告诉我你的想法...比如：我想做一个帮助宠物主人的APP"
                        className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-lg"
                      />
                      <Button 
                        type="submit" 
                        variant="gradient" 
                        size="lg"
                        className="flex items-center gap-2 whitespace-nowrap px-8 py-4 text-lg font-semibold"
                      >
                        免费验证想法
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </form>
                    <p className="text-sm text-gray-400 mt-3 text-center">
                      💡 30分钟内获得专业的可行性分析和实施方案
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="max-w-2xl mx-auto mb-8">
                {/* 稀缺性倒计时 */}
                <div className="mb-6">
                  <ScarcityCountdown />
                </div>
                
                <Link to="/login">
                  <Button variant="gradient" size="lg" className="flex items-center gap-2 px-8 py-4 text-xl font-semibold mx-auto">
                    立即免费体验
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-400 mt-3 text-center">
                  无需信用卡，注册即送3次免费AI分析
                </p>
              </div>
            )}
            
            {/* 次要CTA按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button variant="secondary" size="lg" className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                观看2分钟演示
              </Button>
              <button className="text-gray-300 hover:text-white transition-colors underline">
                查看成功案例 →
              </button>
            </div>

            {/* 成功数据展示 */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {successStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-emerald-400 mr-2" />
                    <span className="text-3xl font-bold text-white">{stat.number}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 信任建立区域 */}
      <section className="py-12 px-6 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-8">
              已获得以下企业和创业者的信任
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-500">阿里巴巴</div>
              <div className="text-2xl font-bold text-gray-500">字节跳动</div>
              <div className="text-2xl font-bold text-gray-500">腾讯</div>
              <div className="text-2xl font-bold text-gray-500">美团</div>
              <div className="text-2xl font-bold text-gray-500">小米</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - 重新设计为以结果为导向 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              为什么选择DeepNeed？
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              传统方式需要几个月的事情，我们30分钟就能完成
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-emerald-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="ml-auto text-emerald-400 font-bold text-sm">{feature.metric}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              工作流程
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              简单三步，从想法到代码
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: '需求澄清',
                description: '描述您的想法，AI 助手通过多轮对话帮您细化需求',
              },
              {
                step: '02',
                title: '生成提示词',
                description: '系统自动生成专业的代码提示词和项目管理提示词',
              },
              {
                step: '03',
                title: '输出代码',
                description: '使用 Claude 等 AI 模型生成完整的项目代码和开发计划',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-6xl font-bold text-primary-500/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-lg">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 成功案例区域 */}
      <section className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              真实成功案例
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              看看其他用户如何通过DeepNeed实现创业梦想
            </p>
          </motion.div>
          <SuccessCases />
        </div>
      </section>

      {/* 用户评价区域 */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              用户真实反馈
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              来自全球用户的五星好评
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <TestimonialCarousel />
            </div>
            <div>
              <TrustBadges />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              准备好开始了吗？
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              立即体验 AI 驱动的需求分析和代码生成
            </p>
            {isAuthenticated ? (
              <div className="max-w-2xl mx-auto">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (quickIdea.trim()) {
                      navigate('/chat', { state: { initialIdea: quickIdea.trim() } });
                    } else {
                      navigate('/chat');
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3 mb-4"
                >
                  <input
                    type="text"
                    value={quickIdea}
                    onChange={(e) => setQuickIdea(e.target.value)}
                    placeholder="告诉我你的想法...比如：我想做一个帮助宠物主人的APP"
                    className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <Button 
                    type="submit" 
                    variant="gradient" 
                    size="lg"
                    className="flex items-center gap-2 whitespace-nowrap px-6 py-3"
                  >
                    开始需求澄清
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>
                <p className="text-sm text-gray-400 text-center">
                  💡 输入你的想法，AI将引导你完成需求分析
                </p>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="gradient" size="lg" className="flex items-center gap-2 mx-auto">
                  免费注册
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
} 