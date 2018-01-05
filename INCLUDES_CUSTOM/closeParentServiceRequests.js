function closeParentServiceRequests() {
	
	parentArr = getParents("ServiceRequest/*/*/*");
	if (!parentArr || parentArr.length == 0) return;
	parentId = parentArr[0];
	logDebug("Parent service request found " + parentId.getCustomID());
	childArr = getChildren("AMS/*/*/*", parentId, capId);
	closeParent = false;
	if (!childArr || childArr.length == 0) { 
		logDebug("No siblings found")
		closeParent = true;
	}
	else {
		logDebug("Siblings exist");
		foundOpenChild = false
		for (cIndex in childArr) {
			thisChildId = childArr[cIndex];
			try {
				thisChildCap = aa.cap.getCap(thisChildId).getOutput();
				thisChildCapStatus = thisChildCap.getCapStatus();
				if (thisChildCapStatus != "Closed")
					foundOpenChild = true;
			}
			catch (err) { logDebug(err); }
		}
		if (!foundOpenChild) {
			closeParent = true;
		}
	}
	if (closeParent) {
		parentCap = aa.cap.getCap(parentId).getOutput();
		if (parentCap.getCapStatus() != "Closed") {
			saveCapId = capId;
			capId = parentId;
			closeTask("Repair", "Work Complete", "set by script", "");
			capId = saveCapId;
		}
			
		else
			logDebug("Parent already closed");
	}
} 