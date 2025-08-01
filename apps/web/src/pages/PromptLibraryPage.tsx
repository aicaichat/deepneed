import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Github, 
  Star, 
  Eye, 
  Copy, 
  Check,
  BarChart3,
  Layers,
  Globe,
  Code,
  BookOpen
} from 'lucide-react';
import Button from '../components/ui/Button';
import { 
  crawlAllPrompts, 
  searchCrawledPrompts, 
  getCrawlStats,
  convertCrawledToTemplate,
  GITHUB_PROMPT_SOURCES,
  type CrawledPrompt 
} from '../lib/github-prompt-crawler';

const PromptLibraryPage: React.FC = () => {
  const [crawledPrompts, setCrawledPrompts] = useState<CrawledPrompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<CrawledPrompt[]>([]);
  const [isLoading, setCrawling] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  // 页面加载时尝试从本地存储加载
  useEffect(() => {
    const stored = localStorage.getItem('crawled-prompts');
    if (stored) {
      const prompts = JSON.parse(stored);
      setCrawledPrompts(prompts);
      setFilteredPrompts(prompts);
      setStats(getCrawlStats(prompts));
    }
  }, []);

  // 搜索和过滤
  useEffect(() => {
    const filtered = searchCrawledPrompts(crawledPrompts, searchQuery, selectedCategory);
    setFilteredPrompts(filtered);
  }, [crawledPrompts, searchQuery, selectedCategory]);

  // 开始爬取
  const handleCrawl = async () => {
    setCrawling(true);
    try {
      const prompts = await crawlAllPrompts();
      setCrawledPrompts(prompts);
      setFilteredPrompts(prompts);
      setStats(getCrawlStats(prompts));
      
      // 保存到本地存储
      localStorage.setItem('crawled-prompts', JSON.stringify(prompts));
      
      console.log('✅ 爬取完成并保存到本地');
    } catch (error) {
      console.error('❌ 爬取失败:', error);
    } finally {
      setCrawling(false);
    }
  };

  // 复制提示词
  const handleCopy = async (prompt: CrawledPrompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.title);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  // 下载为模板
  const handleDownloadAsTemplate = (prompt: CrawledPrompt) => {
    const template = convertCrawledToTemplate(prompt);
    const blob = new Blob([JSON.stringify(template, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.title.replace(/[^a-zA-Z0-9]/g, '_')}_template.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 获取分类列表
  const categories = ['all', ...new Set(crawledPrompts.map(p => p.category))];

  // 获取分类图标
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'development': return <Code className="w-4 h-4" />;
      case 'writing': return <BookOpen className="w-4 h-4" />;
      case 'analysis': return <BarChart3 className="w-4 h-4" />;
      case 'design': return <Layers className="w-4 h-4" />;
      case 'business': return <Globe className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-8 h-8 text-emerald-400" />
            <h1 className="text-4xl font-bold text-white">GitHub 提示词库</h1>
          </div>
          <p className="text-gray-400 text-lg">
            从优质GitHub仓库爬取和整理的专业提示词集合
          </p>
        </motion.div>

        {/* 统计信息 */}
        {stats && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-gray-400 text-sm">总提示词</p>
                  <p className="text-white text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <Layers className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">分类数量</p>
                  <p className="text-white text-2xl font-bold">{Object.keys(stats.byCategory).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <Github className="w-6 h-6 text-emerald-400" />
                <div>
                  <p className="text-gray-400 text-sm">数据源</p>
                  <p className="text-white text-2xl font-bold">{Object.keys(stats.bySource).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">变量总数</p>
                  <p className="text-white text-2xl font-bold">{stats.totalVariables}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 操作栏 */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* 搜索框 */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索提示词..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* 分类筛选 */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/5 border border-white/20 rounded-xl pl-10 pr-8 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="all">所有分类</option>
                  {categories.filter(c => c !== 'all').map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 爬取按钮 */}
            <Button
              onClick={handleCrawl}
              loading={isLoading}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? '爬取中...' : '开始爬取'}
            </Button>
          </div>

          {/* 数据源展示 */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-2">数据源:</p>
            <div className="flex flex-wrap gap-2">
              {GITHUB_PROMPT_SOURCES.map(source => (
                <span
                  key={source.repo}
                  className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs"
                >
                  {source.repo}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 提示词列表 */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence>
            {filteredPrompts.map((prompt, index) => (
              <motion.div
                key={`${prompt.source}-${prompt.title}-${index}`}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="p-6">
                  {/* 提示词头部 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryIcon(prompt.category)}
                        <h3 className="text-xl font-semibold text-white">
                          {prompt.title}
                        </h3>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs">
                          {prompt.category}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        {prompt.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Github className="w-3 h-3" />
                        <span>{prompt.source}</span>
                        {prompt.variables && prompt.variables.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{prompt.variables.length} 个变量</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setExpandedPrompt(
                          expandedPrompt === prompt.title ? null : prompt.title
                        )}
                        className="text-gray-400 hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(prompt)}
                        className="text-gray-400 hover:text-white"
                      >
                        {copiedId === prompt.title ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownloadAsTemplate(prompt)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 标签 */}
                  {prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prompt.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 展开的内容 */}
                  <AnimatePresence>
                    {expandedPrompt === prompt.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/10 pt-4"
                      >
                        <div className="bg-black/20 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">提示词内容:</h4>
                          <pre className="text-gray-300 text-sm whitespace-pre-wrap overflow-x-auto">
                            {prompt.content}
                          </pre>
                        </div>
                        
                        {prompt.variables && prompt.variables.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-white font-medium mb-2">可用变量:</h4>
                            <div className="flex flex-wrap gap-2">
                              {prompt.variables.map(variable => (
                                <span
                                  key={variable}
                                  className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs font-mono"
                                >
                                  {`{${variable}}`}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* 空状态 */}
          {filteredPrompts.length === 0 && !isLoading && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {crawledPrompts.length === 0 ? (
                <div>
                  <Github className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    还没有爬取任何提示词
                  </h3>
                  <p className="text-gray-400 mb-6">
                    点击"开始爬取"按钮从GitHub仓库获取优质提示词
                  </p>
                  <Button onClick={handleCrawl} loading={isLoading}>
                    开始爬取提示词
                  </Button>
                </div>
              ) : (
                <div>
                  <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    没有找到匹配的提示词
                  </h3>
                  <p className="text-gray-400">
                    尝试调整搜索条件或选择不同的分类
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PromptLibraryPage; 