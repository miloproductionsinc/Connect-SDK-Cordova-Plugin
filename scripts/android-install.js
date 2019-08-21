var 
	exec = require('child_process').exec,
	path = require('path'),
	Q = require('q');

function safePath(unsafePath) {
	return path.join(process.cwd(), "./platforms/android/", unsafePath);
}

function AndroidInstall() {}

AndroidInstall.prototype.steps = [
	"cloneConnectSDK"
];

AndroidInstall.prototype.start = function () {
	console.log("Starting ConnectSDK Android install");
	this.executeStep(0);
};

AndroidInstall.prototype.executeStep = function (step) {
	var self = this;
	if (step < this.steps.length) {
		var promise = this[this.steps[step]]();
		promise.then(function () {
			self.executeStep(step + 1);
		}, function (err) {
			console.log("Encountered an error, reverting install steps");
			console.error(err);
			self.revertStep(step);
		});
	} else {
		console.log("ConnectSDK Android install finished");
	}
};

AndroidInstall.prototype.revertStep = function (step) {
	var self = this;
	if (this.currentStep < this.steps.length) {
		var promise = this["revert_" + this.steps[step]]();
		promise.then(function () {
			self.revertStep(step - 1);
		}, function () {
			console.error("An error occured while reverting the install.");
		});
	} else {
		console.log("ConnectSDK Android install reverted");
	}
};

AndroidInstall.prototype.cloneConnectSDK = function () {
	console.log("Retrieving Connect-SDK-Android repository");
	return Q.nfcall(exec, "git submodule update --recursive", {cwd: safePath("../../plugins/cordova-plugin-connectsdk")});
};

AndroidInstall.prototype.revert_cloneConnectSDK = function () {
};

new AndroidInstall().start();
