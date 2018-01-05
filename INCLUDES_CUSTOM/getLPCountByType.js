function getLPCountByType(licType) {
	var retValue = 0;
	var capLicenseResult = aa.licenseScript.getLicenseProf(capId);
	if (capLicenseResult.getSuccess())	{
		var capLicenseArr = capLicenseResult.getOutput();
		if (capLicenseArr != null) {
			for (var thisLic in capLicenseArr) {
				if (capLicenseArr[thisLic].getLicenseType() == licType)
					retValue++;
			}
		}
	}
	return retValue;
}