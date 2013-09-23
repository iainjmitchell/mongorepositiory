task :default => [:ruby_dependencies, :node_dependencies, :test, :git]

task :ruby_dependencies do
	sh 'bundle install --path gems'
end

task :node_dependencies do
	sh 'npm update'
end

task :git => :ruby_dependencies do 
	require 'bundler/setup'
	require 'git_repository'
	message = ENV['m']
	raise 'no commit message specified' if message.nil?
	git = GitRepository.new
	git.pull
	git.add
	git.commit(message: message )
	git.push
end

task :test do
	sh 'mocha ./test  --recursive --reporter nyan'	
end