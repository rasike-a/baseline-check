#!/usr/bin/env node

import { program } from 'commander';
import { scan } from './scan.js';
import { check } from './check.js';
import { generateSummary } from './reporters/summary.js';
import { CacheManager } from './cache.js';
import { ProgressBar, Spinner, Logger, Table } from './ui.js';
import { RecommendationEngine } from './recommendations.js';
import { FrameworkIntegrations } from './integrations.js';
import { AnalyticsEngine } from './analytics.js';
import fs from 'node:fs';
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
      await scan({
        paths: options.paths,
        out: options.out,
        config: options.config
      });
      
      if (options.check !== false) {
        // Step 2: Check compatibility
        console.log('🔍 Checking browser compatibility...');
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

program.parse();
