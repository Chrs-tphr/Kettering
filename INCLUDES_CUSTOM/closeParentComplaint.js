function closeParentComplaint() {
	
	logDebug("In closeParentComplaint")
	parentArr = getParents("Enforcement/Complaint/*/*");
	if (!parentArr || parentArr.length == 0) return;
	parentId = parentArr[0];
	logDebug("Parent complaint found " + parentId.getCustomID());
	childArr = getChildren("Enforcement/Property Maintenance/Violation/*", parentId, capId);
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
				if (thisChildCapStatus != "Closed" && thisChildCapStatus != "Closed/Demolished")
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
			closeTask("In Violation", "All Violations Closed", "set by script", "");
			capId = saveCapId;
		}
			
		else
			logDebug("Parent already closed");
	}
	
}