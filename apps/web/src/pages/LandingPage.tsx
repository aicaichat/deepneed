import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles, Code, BarChart3, Users, Clock, TrendingUp, Star, CheckCircle, PlayCircle, BookOpen, Award, Lightbulb } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import { 
  RealtimeActivity, 
  ScarcityCountdown, 
  TestimonialCarousel, 
  SuccessCases, 
  TrustBadges 
} from '@/components/MarketingElements';
import { useT } from '@/i18n';
import { APP_CONFIG } from '@/config';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [quickIdea, setQuickIdea] = useState('');
  const t = useT();

  const features = [
    {
      icon: Lightbulb,
      title: 'AI机会发现器',
      description: '基于全球痛点数据，60秒筛选出最适合您的AI创业机会',
      metric: '60秒发现',
      isNew: true,
      link: '/opportunity-finder'
    },
    {
      icon: MessageSquare,
      title: '30分钟想法验证',
      description: '通过AI对话快速验证百万应用想法可行性，比传统调研快10倍',
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
      title: '6周百万应用创业营',
      description: '从0到1打造可收费AI应用，实现首批真实营收或50 DAU',
      metric: '6周训练'
    },
  ];

  // 成功案例数据
  const successStats = [
    { number: '数百', label: '成功项目', icon: CheckCircle },
    { number: '数十', label: '百万应用', icon: Users },
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
              <span className="text-emerald-400 text-sm font-medium">{t('hero.proof', '已帮助众多创新应用成功落地')}</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </motion.div>

            {/* 主标题 - 打造百万应用的必选神器 */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-white">{t('hero.title.leading', '打造百万应用的')}</span>
              <span className="text-gradient block">{t('hero.title.highlight', '必选神器')}</span>
            </h1>
            
            {/* 副标题 - 强调AI时代的创业机会 */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle.beforeBrand', 'AI时代，每个人都能成为百万应用的创造者。')}
              {t('app.name', 'DeepNeed')}
              {t('hero.subtitle.afterBrand', '让创意快速变现，')}
              <span className="text-emerald-400 font-semibold">{t('hero.subtitle.afterBrand.tail', '从想法到上线只需30分钟，6周完整创业训练营助你成功。')}</span>
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
                      🚀 立即开始你的百万应用之旅
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
                        placeholder={t('hero.cta.placeholder', '告诉我你的想法...比如：我想做一个帮助宠物主人的APP')}
                        className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-lg"
                      />
                      <Button 
                        type="submit" 
                        variant="gradient" 
                        size="lg"
                        className="flex items-center gap-2 whitespace-nowrap px-8 py-4 text-lg font-semibold"
                      >
                        {t('hero.cta.primaryAuthenticated', '免费验证想法')}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </form>
                    <p className="text-sm text-gray-400 mt-3 text-center">
                      {t('cta.note', '💡 30分钟内获得专业的百万应用可行性分析和实施方案')}
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
                    {t('hero.cta.primary', '立即开始百万应用之旅')}
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-400 mt-3 text-center">
                  {t('hero.cta.note', '无需信用卡，注册即送3次免费AI分析，开启你的百万应用之路')}
                </p>
              </div>
            )}
            
            {/* 统一CTA条：29.9 / 299 / 2999+ */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
              <Link to="/opportunity-finder">
                <Button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3">¥{APP_CONFIG.COMMERCE.PRICES.PREMIUM_REPORT} 解锁报告+BP</Button>
              </Link>
              <Link to="/course/1">
                <Button variant="secondary" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3">¥{APP_CONFIG.COMMERCE.COURSE.BASIC} 报名训练营</Button>
              </Link>
              <a href="mailto:vip@deepneed.com.cn">
                <Button variant="secondary" className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white px-6 py-3">¥{APP_CONFIG.COMMERCE.CUSTOM.MIN}+ 获取定制方案</Button>
              </a>
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
              {t('features.why.titlePrefix','为什么')}{t('app.name','DeepNeed')}{t('features.why.titleSuffix','是百万应用的必选神器？')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('features.why.subtitle','传统方式需要几个月的事情，我们30分钟就能完成，6周系统训练助你掌握AI应用开发')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const FeatureCard = (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-emerald-500/50 transition-all duration-300 group relative ${
                    feature.link ? 'cursor-pointer' : ''
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onClick={() => feature.link && navigate(feature.link)}
                >
                  {feature.isNew && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      NEW
                    </div>
                  )}
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
                  {feature.link && (
                    <div className="mt-4 flex items-center text-primary-400 text-sm font-medium">
                      立即体验 <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  )}
                </motion.div>
              );
              
              return FeatureCard;
            })}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('how.title','工作流程')}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('how.subtitle','简单三步，从想法到代码')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: t('how.step1.title','需求澄清'),
                description: t('how.step1.desc','描述您的想法，AI 助手通过多轮对话帮您细化需求'),
              },
              {
                step: '02',
                title: t('how.step2.title','生成提示词'),
                description: t('how.step2.desc','系统自动生成专业的代码提示词和项目管理提示词'),
              },
              {
                step: '03',
                title: t('how.step3.title','输出代码'),
                description: t('how.step3.desc','使用 Claude 等 AI 模型生成完整的项目代码和开发计划'),
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('cases.title','真实成功案例')}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('cases.subtitle','看看其他用户如何通过我们的平台实现创业梦想')}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('reviews.title','用户真实反馈')}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('reviews.subtitle','来自全球用户的五星好评')}
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

      {/* 课程推广区域 */}
      <section className="py-20 px-6 bg-gradient-to-r from-emerald-900/20 to-purple-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">{t('course.badge','热门课程')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('course.titlePrefix','人人都该上的')}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">
                {t('course.titleHighlight','百万应用创作课')}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              从产品思维到技术实现，从0到1掌握AI时代的应用开发全流程。
              学会用AI工具10倍提升开发效率，打造属于自己的百万级应用。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t('course.card.bootcamp.title','6周百万应用创业营')}</h3>
                <p className="text-gray-300 text-sm">{t('course.card.bootcamp.desc','从0到1打造可收费AI应用，实现首批真实营收')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t('course.card.students.title','2847+ 学员')}</h3>
                <p className="text-gray-300 text-sm">{t('course.card.students.desc','来自各行各业的学员，平均评分4.9分')}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t('course.card.successApps.title','众多 百万应用')}</h3>
                <p className="text-gray-300 text-sm">{t('course.card.successApps.desc','学员成功打造的应用，实现真实商业价值')}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button variant="gradient" size="lg" className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {t('course.cta.enroll','立即报名百万应用课程')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/ai-ranking">
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {t('course.cta.ranking','查看AI应用排行榜')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('cta.title','准备好打造你的百万应用了吗？')}</h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('cta.subtitle','立即体验 AI 驱动的百万应用创造神器')}
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
                    placeholder={t('cta.input.placeholder','告诉我你的想法...比如：我想做一个帮助宠物主人的APP')}
                    className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <Button 
                    type="submit" 
                    variant="gradient" 
                    size="lg"
                    className="flex items-center gap-2 whitespace-nowrap px-6 py-3"
                  >
                    {t('cta.button.authenticated','开始需求澄清')}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>
                <p className="text-sm text-gray-400 text-center">
                  {t('cta.note','💡 输入你的想法，AI将引导你完成需求分析')}
                </p>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="gradient" size="lg" className="flex items-center gap-2 mx-auto">
                  {t('cta.button.register','免费注册')}
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