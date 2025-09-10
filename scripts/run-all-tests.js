#!/usr/bin/env node

// Script to run all tests in sequence with proper setup and teardown
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor() {
    this.results = {
      unit: null,
      integration: null,
      e2e: null,
      performance: null
    };
    this.startTime = Date.now();
  }

  async runCommand(command, args = [], options = {}) {
    return new Promise((resolve, reject) => {
      console.log(`\n🚀 Running: ${command} ${args.join(' ')}`);
      
      const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true,
        ...options
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  async checkDependencies() {
    console.log('📦 Checking dependencies...');
    
    if (!fs.existsSync('package.json')) {
      throw new Error('package.json not found. Please run this script from the project root.');
    }

    if (!fs.existsSync('node_modules')) {
      console.log('📥 Installing dependencies...');
      await this.runCommand('npm', ['install']);
    }

    console.log('✅ Dependencies OK');
  }

  async runUnitTests() {
    console.log('\n🧪 Running Unit Tests...');
    try {
      await this.runCommand('npm', ['run', 'test:unit']);
      this.results.unit = 'PASSED';
      console.log('✅ Unit tests passed');
    } catch (error) {
      this.results.unit = 'FAILED';
      console.log('❌ Unit tests failed');
      throw error;
    }
  }

  async runIntegrationTests() {
    console.log('\n🔗 Running Integration Tests...');
    try {
      await this.runCommand('npm', ['run', 'test:integration']);
      this.results.integration = 'PASSED';
      console.log('✅ Integration tests passed');
    } catch (error) {
      this.results.integration = 'FAILED';
      console.log('❌ Integration tests failed');
      throw error;
    }
  }

  async startTestServer() {
    console.log('\n🌐 Starting test server...');
    
    return new Promise((resolve, reject) => {
      const server = spawn('npm', ['run', 'serve'], {
        stdio: 'pipe',
        shell: true
      });

      let serverReady = false;

      server.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Available on:') || output.includes('localhost:8080')) {
          if (!serverReady) {
            serverReady = true;
            console.log('✅ Test server started');
            resolve(server);
          }
        }
      });

      server.stderr.on('data', (data) => {
        console.error('Server error:', data.toString());
      });

      server.on('close', (code) => {
        if (code !== 0 && !serverReady) {
          reject(new Error(`Server failed to start with code ${code}`));
        }
      });

      // Timeout after 30 seconds
      setTimeout(() => {
        if (!serverReady) {
          server.kill();
          reject(new Error('Server failed to start within 30 seconds'));
        }
      }, 30000);
    });
  }

  async runE2ETests() {
    console.log('\n🎭 Running E2E Tests...');
    let server = null;
    
    try {
      // Start server for E2E tests
      server = await this.startTestServer();
      
      // Wait a bit for server to be fully ready
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await this.runCommand('npm', ['run', 'test:e2e']);
      this.results.e2e = 'PASSED';
      console.log('✅ E2E tests passed');
    } catch (error) {
      this.results.e2e = 'FAILED';
      console.log('❌ E2E tests failed');
      throw error;
    } finally {
      if (server) {
        console.log('🛑 Stopping test server...');
        server.kill();
      }
    }
  }

  async runPerformanceTests() {
    console.log('\n⚡ Running Performance Tests...');
    try {
      await this.runCommand('npm', ['test', '--testPathPattern=performance']);
      this.results.performance = 'PASSED';
      console.log('✅ Performance tests passed');
    } catch (error) {
      this.results.performance = 'FAILED';
      console.log('❌ Performance tests failed');
      // Don't throw for performance tests - they're informational
    }
  }

  async generateReport() {
    const endTime = Date.now();
    const duration = Math.round((endTime - this.startTime) / 1000);
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('='.repeat(60));
    
    const testTypes = [
      { name: 'Unit Tests', key: 'unit' },
      { name: 'Integration Tests', key: 'integration' },
      { name: 'E2E Tests', key: 'e2e' },
      { name: 'Performance Tests', key: 'performance' }
    ];

    let allPassed = true;
    
    testTypes.forEach(({ name, key }) => {
      const result = this.results[key];
      const icon = result === 'PASSED' ? '✅' : result === 'FAILED' ? '❌' : '⏭️';
      const status = result || 'SKIPPED';
      
      console.log(`${icon} ${name.padEnd(20)} ${status}`);
      
      if (result === 'FAILED') {
        allPassed = false;
      }
    });

    console.log('='.repeat(60));
    console.log(`⏱️  Total Duration: ${duration}s`);
    console.log(`🎯 Overall Status: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
    console.log('='.repeat(60));

    // Generate JSON report
    const report = {
      timestamp: new Date().toISOString(),
      duration: duration,
      results: this.results,
      success: allPassed
    };

    const reportsDir = path.join(__dirname, '..', 'test-results');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const reportPath = path.join(reportsDir, `test-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`📄 Report saved to: ${reportPath}`);

    return allPassed;
  }

  async run() {
    try {
      console.log('🧪 Hotel Notify Hub - Automated Test Suite');
      console.log('==========================================\n');

      await this.checkDependencies();
      
      // Run tests in sequence
      await this.runUnitTests();
      await this.runIntegrationTests();
      await this.runE2ETests();
      await this.runPerformanceTests();

      const success = await this.generateReport();
      
      if (success) {
        console.log('\n🎉 All tests completed successfully!');
        process.exit(0);
      } else {
        console.log('\n💥 Some tests failed. Check the logs above.');
        process.exit(1);
      }
      
    } catch (error) {
      console.error('\n💥 Test suite failed:', error.message);
      await this.generateReport();
      process.exit(1);
    }
  }
}

// Run the test suite if this file is executed directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.run();
}

module.exports = TestRunner;
