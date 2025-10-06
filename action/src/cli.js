#!/usr/bin/env node

import fs from 'node:fs';
import { program } from 'commander';
import { scan } from './scan.js';
import { check } from './check.js';
import { generateSummary } from './reporters/summary.js';
import { CacheManager } from './cache.js';
import { ProgressBar, Spinner, Logger, Table } from './ui.js';
import { RecommendationEngine } from './recommendations.js';
import { FrameworkIntegrations } from './integrations.js';
import { AnalyticsEngine } from './analytics.js';
import { InteractiveMode } from './interactive.js';
import { ErrorHandler } from './error-handler.js';
import { ExamplesGenerator } from './examples.js';
import { AIAnalyzer, AIRecommendations, AICodeFixer, AILearning } from './ai/index.js';
import path from 'node:path';

program
  .name('baseline-check')
  .description('Check web features for baseline browser compatibility')
  .version('2.0.0');

program
  .command('scan')
  .description('Scan codebase for modern web features')
  .option('-p, --paths <paths>', 'Comma-separated paths to scan', '.')
  .option('-o, --out <file>', 'Output file for scan results', 'baseline-report.json')
  .option('-c, --config <file>', 'Configuration file path')
  .action(async (options) => {
    try {
      await scan(options);
    } catch (error) {
      console.error(`Scan failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('check')
  .description('Check feature compatibility against browser data')
  .requiredOption('-r, --report <file>', 'Input report file from scan')
  .option('-o, --out <file>', 'Output file for compatibility results')
  .action(async (options) => {
    try {
      await check(options);
    } catch (error) {
      console.error(`Check failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('report')
  .description('Generate a summary report')
  .option('-r, --report <file>', 'Input report file', 'baseline-report.json')
  .option('-f, --format <format>', 'Output format (markdown, json, html)', 'markdown')
  .option('-o, --out <file>', 'Output file')
  .action(async (options) => {
    try {
      await generateSummary(options);
    } catch (error) {
      console.error(`Report generation failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('run')
  .description('Run complete scan and check pipeline')
  .option('-p, --paths <paths>', 'Comma-separated paths to scan', '.')
  .option('-o, --out <file>', 'Output file for final results', 'baseline-report.json')
  .option('-c, --config <file>', 'Configuration file path')
  .option('--no-check', 'Skip compatibility checking')
  .option('--no-report', 'Skip report generation')
  .action(async (options) => {
    try {
      console.log('🚀 Starting baseline check pipeline...');
      
      // Step 1: Scan
      console.log('📁 Scanning for features...');
      const scanResult = await scan({
        paths: options.paths,
        out: options.out,
        config: options.config
      });
      
      // Verify scan completed successfully
      if (!scanResult || !scanResult.metadata) {
        throw new Error('Scan failed to complete');
      }
      
      if (options.check !== false) {
        // Step 2: Check compatibility
        console.log('🔍 Checking browser compatibility...');
        
        // Verify the scan output file exists
        if (!fs.existsSync(options.out)) {
          throw new Error(`Report file "${options.out}" does not exist`);
        }
        
        await check({
          report: options.out,
          out: options.out
        });
      }
      
      if (options.report !== false) {
        // Step 3: Generate summary
        console.log('📊 Generating summary report...');
        await generateSummary({
          report: options.out,
          format: 'markdown'
        });
      }
      
      console.log('✅ Baseline check completed successfully!');
    } catch (error) {
      console.error(`Pipeline failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize baseline-check configuration')
  .option('-f, --force', 'Overwrite existing config file')
  .option('--framework <framework>', 'Initialize for specific framework (react, vue, angular, svelte, next, nuxt)')
  .action(async (options) => {
    const configPath = 'baseline-check.config.js';
    const logger = new Logger();
    
    if (fs.existsSync(configPath) && !options.force) {
      logger.warning(`Configuration file already exists: ${configPath}`);
      logger.info('Use --force to overwrite');
      return;
    }
    
    let config;
    
    if (options.framework) {
      const integrations = new FrameworkIntegrations();
      const detectedFramework = integrations.detectFramework('.');
      
      if (detectedFramework && detectedFramework !== options.framework) {
        logger.warning(`Detected ${detectedFramework} but requested ${options.framework}`);
      }
      
      try {
        config = integrations.generateConfig(options.framework);
        logger.info(`Generated configuration for ${options.framework}`);
      } catch (error) {
        logger.error(`Unknown framework: ${options.framework}`);
        process.exit(1);
      }
    } else {
      // Default configuration
      config = `export default {
  // File patterns to scan
  patterns: [
    '**/*.{js,ts,tsx,jsx,css,html}',
    '**/*.vue',
    '**/*.svelte'
  ],
  
  // Directories to ignore
  ignore: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.git/**',
    '**/coverage/**',
    '**/.next/**',
    '**/out/**'
  ],
  
  // Custom feature detection rules
  features: {
    // Add custom regex patterns here
    // 'custom-feature': { 
    //   re: /custom-pattern/g, 
    //   category: 'api' 
    // }
  },
  
  // Browser support thresholds
  baseline: {
    minBrowsers: 3, // Minimum number of browsers for baseline status
    browsers: ['chrome', 'firefox', 'safari', 'edge']
  },
  
  // Performance settings
  performance: {
    maxFileSize: 1024 * 1024, // 1MB max file size
    concurrentFiles: 10, // Process files concurrently
    cacheResults: true // Cache scan results
  }
};`;
    }
    
    try {
      fs.writeFileSync(configPath, config);
      logger.success(`Created configuration file: ${configPath}`);
      logger.info('Edit the file to customize your baseline check settings');
    } catch (error) {
      logger.error(`Failed to create config file: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('analyze')
  .description('Analyze scan results and provide recommendations')
  .option('-r, --report <file>', 'Input report file', 'baseline-report.json')
  .option('-o, --out <file>', 'Output file for analysis')
  .action(async (options) => {
    const logger = new Logger();
    const spinner = new Spinner();
    
    try {
      spinner.start('Analyzing report...');
      
      if (!fs.existsSync(options.report)) {
        throw new Error(`Report file "${options.report}" does not exist`);
      }
      
      const report = JSON.parse(fs.readFileSync(options.report, 'utf8'));
      const recommendationEngine = new RecommendationEngine();
      
      const suggestions = recommendationEngine.analyzeReport(report);
      const analysis = recommendationEngine.generateReport(suggestions);
      
      spinner.stop('Analysis complete');
      
      if (options.out) {
        fs.writeFileSync(options.out, JSON.stringify(analysis, null, 2));
        logger.success(`Analysis written to: ${options.out}`);
      } else {
        console.log('\n# Analysis Report\n');
        console.log(analysis.summary);
        console.log('\n## Recommendations\n');
        
        for (const suggestion of analysis.suggestions) {
          console.log(`### ${suggestion.title}`);
          console.log(suggestion.message);
          if (suggestion.alternatives) {
            console.log('\n**Alternatives:**');
            suggestion.alternatives.forEach(alt => console.log(`- ${alt}`));
          }
          if (suggestion.polyfills) {
            console.log('\n**Polyfills:**');
            suggestion.polyfills.forEach(poly => console.log(`- ${poly}`));
          }
          console.log('');
        }
      }
    } catch (error) {
      spinner.stop('Analysis failed');
      logger.error(`Analysis failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('analytics')
  .description('View analytics and trends')
  .option('-d, --days <days>', 'Number of days to analyze', '30')
  .option('-o, --out <file>', 'Output file for analytics report')
  .action(async (options) => {
    const logger = new Logger();
    const analytics = new AnalyticsEngine();
    
    try {
      const trends = analytics.getTrends(parseInt(options.days));
      
      if (!trends) {
        logger.warning('No analytics data available. Run some scans first.');
        return;
      }
      
      const report = analytics.generateReport();
      
      if (options.out) {
        fs.writeFileSync(options.out, report);
        logger.success(`Analytics report written to: ${options.out}`);
      } else {
        console.log(report);
      }
    } catch (error) {
      logger.error(`Analytics failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('setup')
  .description('Setup integration for specific framework or tool')
  .option('-f, --framework <framework>', 'Framework to setup (react, vue, angular, svelte, next, nuxt)')
  .option('--github-action', 'Generate GitHub Action workflow')
  .option('--vscode', 'Generate VSCode settings')
  .action(async (options) => {
    const logger = new Logger();
    const integrations = new FrameworkIntegrations();
    
    try {
      if (options.framework) {
        const config = integrations.generateConfig(options.framework);
        fs.writeFileSync('baseline-check.config.js', config);
        logger.success(`Setup complete for ${options.framework}`);
      }
      
      if (options.githubAction) {
        const framework = options.framework || integrations.detectFramework('.') || 'react';
        const workflow = integrations.createGitHubAction(framework);
        fs.writeFileSync('.github/workflows/baseline-check.yml', workflow);
        logger.success('GitHub Action workflow created');
      }
      
      if (options.vscode) {
        const settings = integrations.createVSCodeSettings();
        const vscodeDir = '.vscode';
        if (!fs.existsSync(vscodeDir)) {
          fs.mkdirSync(vscodeDir);
        }
        fs.writeFileSync('.vscode/settings.json', JSON.stringify(settings, null, 2));
        logger.success('VSCode settings created');
      }
      
      if (!options.framework && !options.githubAction && !options.vscode) {
        logger.info('Available options:');
        logger.info('  --framework <name>  Setup for specific framework');
        logger.info('  --github-action     Generate GitHub Action workflow');
        logger.info('  --vscode           Generate VSCode settings');
      }
    } catch (error) {
      logger.error(`Setup failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('cache')
  .description('Manage cache')
  .option('--clear', 'Clear all cached data')
  .option('--stats', 'Show cache statistics')
  .action(async (options) => {
    const logger = new Logger();
    const cache = new CacheManager();
    
    try {
      if (options.clear) {
        cache.invalidateCache();
        logger.success('Cache cleared');
      }
      
      if (options.stats) {
        const stats = cache.getCacheStats();
        console.log('\n# Cache Statistics\n');
        console.log(`Files: ${stats.files}`);
        console.log(`Size: ${stats.sizeFormatted}`);
      }
      
      if (!options.clear && !options.stats) {
        logger.info('Available options:');
        logger.info('  --clear   Clear all cached data');
        logger.info('  --stats   Show cache statistics');
      }
    } catch (error) {
      logger.error(`Cache operation failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('interactive')
  .alias('i')
  .description('Start interactive mode with watch functionality')
  .option('-p, --path <path>', 'Initial path to scan', '.')
  .option('-v, --verbose', 'Verbose output')
  .action(async (options) => {
    const interactive = new InteractiveMode(options);
    await interactive.start();
  });

program
  .command('fix')
  .description('Get quick fixes for compatibility issues')
  .option('-f, --feature <feature>', 'Feature to get fix for')
  .option('-o, --output <file>', 'Output file for fix code')
  .action(async (options) => {
    const logger = new Logger();
    const errorHandler = new ErrorHandler();
    
    if (!options.feature) {
      logger.error('Please specify a feature with --feature');
      logger.info('Example: npx baseline-check-tool fix --feature="css.grid"');
      process.exit(1);
    }
    
    try {
      const error = errorHandler.getErrorMessage(options.feature, 'risky');
      const fixCode = errorHandler.generateFixCommand(options.feature);
      
      if (options.output) {
        fs.writeFileSync(options.output, fixCode);
        logger.success(`Fix code written to: ${options.output}`);
      } else {
        console.log(errorHandler.formatError(error));
        console.log('\n📝 Fix code:');
        console.log(fixCode);
      }
    } catch (error) {
      logger.error(`Fix generation failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('examples')
  .description('Show examples and best practices for different frameworks')
  .option('-f, --framework <framework>', 'Framework to show examples for (react/vue/angular/vanilla)', 'vanilla')
  .option('-o, --output <file>', 'Output file for examples')
  .option('--all', 'Show examples for all frameworks')
  .action(async (options) => {
    const logger = new Logger();
    const examplesGenerator = new ExamplesGenerator();
    
    try {
      let content;
      
      if (options.all) {
        content = examplesGenerator.generateAllExamples();
      } else {
        const availableFrameworks = examplesGenerator.getAvailableFrameworks();
        if (!availableFrameworks.includes(options.framework)) {
          logger.error(`Unknown framework: ${options.framework}`);
          logger.info(`Available frameworks: ${availableFrameworks.join(', ')}`);
          process.exit(1);
        }
        content = examplesGenerator.generateExamples(options.framework);
      }
      
      if (options.output) {
        fs.writeFileSync(options.output, content);
        logger.success(`Examples written to: ${options.output}`);
      } else {
        console.log(content);
      }
    } catch (error) {
      logger.error(`Examples generation failed: ${error.message}`);
      process.exit(1);
    }
  });

// AI-Powered Commands
program
  .command('ai-analyze')
  .description('AI-powered code analysis with smart recommendations')
  .option('-p, --paths <paths>', 'Comma-separated paths to analyze', '.')
  .option('-o, --out <file>', 'Output file for AI analysis results', 'ai-analysis.json')
  .option('-c, --config <file>', 'Configuration file path')
  .option('--api-key <key>', 'OpenAI API key for cloud analysis')
  .option('--local-only', 'Use only local analysis (no cloud API)')
  .option('--format <format>', 'Output format (json/markdown/html)', 'json')
  .action(async (options) => {
    const logger = new Logger();
    const spinner = new Spinner('Analyzing code with AI...');
    
    try {
      spinner.start();
      
      const aiAnalyzer = new AIAnalyzer({
        apiKey: options.apiKey || process.env.OPENAI_API_KEY,
        enableCloudAnalysis: !options.localOnly,
        enableLocalAnalysis: true
      });
      
      const paths = options.paths.split(',').map(p => p.trim());
      const results = [];
      
      for (const path of paths) {
        if (fs.existsSync(path)) {
          const files = await getFiles(path);
          
          for (const file of files) {
            const code = fs.readFileSync(file, 'utf8');
            const analysis = await aiAnalyzer.analyzeCode(code, file, {
              framework: 'unknown',
              browsers: ['chrome', 'firefox', 'safari', 'edge']
            });
            results.push(analysis);
          }
        }
      }
      
      const output = {
        timestamp: new Date().toISOString(),
        totalFiles: results.length,
        analyses: results,
        summary: {
          totalRecommendations: results.reduce((sum, r) => sum + (r.recommendations?.length || 0), 0),
          averageRiskScore: results.reduce((sum, r) => sum + (r.riskScore || 0), 0) / results.length,
          averageCompatibilityScore: results.reduce((sum, r) => sum + (r.compatibilityScore || 0), 0) / results.length
        }
      };
      
      if (options.format === 'json') {
        fs.writeFileSync(options.out, JSON.stringify(output, null, 2));
      } else if (options.format === 'markdown') {
        const markdown = generateAIMarkdownReport(output);
        fs.writeFileSync(options.out, markdown);
      } else if (options.format === 'html') {
        const html = generateAIHTMLReport(output);
        fs.writeFileSync(options.out, html);
      }
      
      spinner.stop();
      logger.success(`AI analysis completed: ${options.out}`);
      logger.info(`Analyzed ${results.length} files with ${output.summary.totalRecommendations} recommendations`);
      
    } catch (error) {
      spinner.stop();
      logger.error(`AI analysis failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('ai-fix')
  .description('AI-powered automatic code fixing')
  .option('-f, --file <file>', 'File to fix')
  .option('-r, --report <file>', 'Analysis report file')
  .option('--dry-run', 'Show what would be fixed without making changes')
  .option('--backup', 'Create backup before fixing')
  .action(async (options) => {
    const logger = new Logger();
    
    try {
      const aiCodeFixer = new AICodeFixer({
        enableAutoFix: !options.dryRun,
        enableBackup: options.backup
      });
      
      if (options.file) {
        // Fix single file
        const code = fs.readFileSync(options.file, 'utf8');
        const analysis = await analyzeFileForFixes(code, options.file);
        
        if (options.dryRun) {
          logger.info('Dry run - would apply the following fixes:');
          analysis.recommendations.forEach(rec => {
            console.log(`- ${rec.message}`);
            console.log(`  Fix: ${rec.suggestion}`);
          });
        } else {
          const result = await aiCodeFixer.applyFixes(options.file, analysis.recommendations);
          
          if (result.success) {
            logger.success(`Applied ${result.fixesApplied.length} fixes to ${options.file}`);
            if (result.backupPath) {
              logger.info(`Backup created: ${result.backupPath}`);
            }
          } else {
            logger.error(`Fix application failed: ${result.errors.join(', ')}`);
          }
        }
      } else if (options.report) {
        // Fix based on analysis report
        const report = JSON.parse(fs.readFileSync(options.report, 'utf8'));
        const filesToFix = new Set();
        
        report.analyses.forEach(analysis => {
          if (analysis.recommendations?.length > 0) {
            filesToFix.add(analysis.filePath);
          }
        });
        
        for (const filePath of filesToFix) {
          if (fs.existsSync(filePath)) {
            const analysis = report.analyses.find(a => a.filePath === filePath);
            
            if (options.dryRun) {
              logger.info(`Would fix ${filePath}:`);
              analysis.recommendations.forEach(rec => {
                console.log(`- ${rec.message}`);
              });
            } else {
              const result = await aiCodeFixer.applyFixes(filePath, analysis.recommendations);
              
              if (result.success) {
                logger.success(`Fixed ${filePath}: ${result.fixesApplied.length} fixes applied`);
              } else {
                logger.error(`Failed to fix ${filePath}: ${result.errors.join(', ')}`);
              }
            }
          }
        }
      } else {
        logger.error('Please specify either --file or --report');
        process.exit(1);
      }
      
    } catch (error) {
      logger.error(`AI fix failed: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('ai-learn')
  .description('AI learning and personalization features')
  .option('--stats', 'Show learning statistics')
  .option('--export <format>', 'Export learning data (json/csv)')
  .option('--reset', 'Reset learning data')
  .action(async (options) => {
    const logger = new Logger();
    
    try {
      const aiLearning = new AILearning();
      
      if (options.stats) {
        const stats = aiLearning.getLearningStats();
        console.log('\n📊 AI Learning Statistics:');
        console.log(`Total Patterns: ${stats.totalPatterns}`);
        console.log(`Total Users: ${stats.totalUsers}`);
        console.log(`Total Interactions: ${stats.totalInteractions}`);
        console.log(`Average Confidence: ${(stats.averageConfidence * 100).toFixed(1)}%`);
        
        if (stats.topPatterns.length > 0) {
          console.log('\n🔝 Top Patterns:');
          stats.topPatterns.forEach((pattern, index) => {
            console.log(`${index + 1}. ${pattern.type} (${(pattern.confidence * 100).toFixed(1)}% confidence)`);
          });
        }
      } else if (options.export) {
        const data = await aiLearning.exportLearningData(options.export);
        const filename = `learning-data.${options.export}`;
        fs.writeFileSync(filename, data);
        logger.success(`Learning data exported to: ${filename}`);
      } else if (options.reset) {
        // Reset learning data
        fs.unlinkSync(aiLearning.options.learningDataPath);
        logger.success('Learning data reset');
      } else {
        logger.info('AI Learning commands:');
        logger.info('  --stats     Show learning statistics');
        logger.info('  --export    Export learning data');
        logger.info('  --reset     Reset learning data');
      }
      
    } catch (error) {
      logger.error(`AI learning failed: ${error.message}`);
      process.exit(1);
    }
  });

// Helper functions
async function getFiles(path) {
  const files = [];
  
  if (fs.statSync(path).isDirectory()) {
    const entries = fs.readdirSync(path, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = `${path}/${entry.name}`;
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        files.push(...await getFiles(fullPath));
      } else if (entry.isFile() && /\.(js|jsx|ts|tsx|css|html)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  } else {
    files.push(path);
  }
  
  return files;
}

async function analyzeFileForFixes(code, filePath) {
  const aiAnalyzer = new AIAnalyzer({ enableLocalAnalysis: true });
  return await aiAnalyzer.analyzeCode(code, filePath);
}

function generateAIMarkdownReport(output) {
  let markdown = `# AI Analysis Report\n\n`;
  markdown += `**Generated:** ${output.timestamp}\n`;
  markdown += `**Files Analyzed:** ${output.totalFiles}\n`;
  markdown += `**Total Recommendations:** ${output.summary.totalRecommendations}\n\n`;
  
  markdown += `## Summary\n\n`;
  markdown += `- **Average Risk Score:** ${output.summary.averageRiskScore.toFixed(1)}%\n`;
  markdown += `- **Average Compatibility Score:** ${output.summary.averageCompatibilityScore.toFixed(1)}%\n\n`;
  
  markdown += `## File Analysis\n\n`;
  
  output.analyses.forEach((analysis, index) => {
    markdown += `### ${index + 1}. ${analysis.filePath}\n\n`;
    markdown += `- **Risk Score:** ${analysis.riskScore}%\n`;
    markdown += `- **Compatibility Score:** ${analysis.compatibilityScore}%\n`;
    markdown += `- **Recommendations:** ${analysis.recommendations?.length || 0}\n\n`;
    
    if (analysis.recommendations?.length > 0) {
      markdown += `#### Recommendations:\n\n`;
      analysis.recommendations.forEach(rec => {
        markdown += `- **${rec.severity.toUpperCase()}:** ${rec.message}\n`;
        if (rec.suggestion) {
          markdown += `  - Fix: ${rec.suggestion}\n`;
        }
        markdown += `\n`;
      });
    }
    
    markdown += `---\n\n`;
  });
  
  return markdown;
}

function generateAIHTMLReport(output) {
  return `<!DOCTYPE html>
<html>
<head>
    <title>AI Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 8px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .stat-card { background: #e3f2fd; padding: 15px; border-radius: 8px; text-align: center; }
        .file-analysis { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .recommendation { margin: 10px 0; padding: 10px; background: #fff3e0; border-left: 4px solid #ff9800; }
        .critical { border-left-color: #f44336; }
        .high { border-left-color: #ff9800; }
        .medium { border-left-color: #ffc107; }
        .low { border-left-color: #4caf50; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤖 AI Analysis Report</h1>
        <p><strong>Generated:</strong> ${output.timestamp}</p>
        <p><strong>Files Analyzed:</strong> ${output.totalFiles}</p>
        <p><strong>Total Recommendations:</strong> ${output.summary.totalRecommendations}</p>
    </div>
    
    <div class="summary">
        <div class="stat-card">
            <h3>Average Risk Score</h3>
            <p>${output.summary.averageRiskScore.toFixed(1)}%</p>
        </div>
        <div class="stat-card">
            <h3>Average Compatibility Score</h3>
            <p>${output.summary.averageCompatibilityScore.toFixed(1)}%</p>
        </div>
    </div>
    
    <h2>File Analysis</h2>
    ${output.analyses.map((analysis, index) => `
        <div class="file-analysis">
            <h3>${index + 1}. ${analysis.filePath}</h3>
            <p><strong>Risk Score:</strong> ${analysis.riskScore}% | 
               <strong>Compatibility Score:</strong> ${analysis.compatibilityScore}% | 
               <strong>Recommendations:</strong> ${analysis.recommendations?.length || 0}</p>
            
            ${analysis.recommendations?.map(rec => `
                <div class="recommendation ${rec.severity}">
                    <strong>${rec.severity.toUpperCase()}:</strong> ${rec.message}
                    ${rec.suggestion ? `<br><em>Fix: ${rec.suggestion}</em>` : ''}
                </div>
            `).join('') || '<p>No recommendations for this file.</p>'}
        </div>
    `).join('')}
</body>
</html>`;
}

program.parse();
