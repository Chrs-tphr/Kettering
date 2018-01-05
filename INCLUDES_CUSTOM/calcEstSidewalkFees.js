function calcEstSidewalkFees() {
	
	qtyFields = new Array();
	qtyFields.push("4in Sidewalk Replacement");
	qtyFields.push("6in Sidewalk Replacement");
	qtyFields.push("6in Drive Approach");
	qtyFields.push("Asphalt Drive Approach");
	qtyFields.push("Concrete Curb Removal");
	qtyFields.push("Concrete Curb Replacement");
	qtyFields.push("Flatwork Removal");

	totalFee = 0;
	
	if (AInfo["Estimated Fee - Total"] == undefined || AInfo["Estimated Fee - Total"] == null || AInfo["Estimated Fee - Total"] == "") {
		for (qIndex in qtyFields) {
			qtyField = qtyFields[qIndex];
			qty = AInfo[qtyField];
			//aa.print(qtyField + ":" + qty);
			if (parseFloat(qty) > 0) {
				feeDef = getFeeDefByDesc("SIDEWALK ASSESSMENT", qtyField);
				if (feeDef != null) {
					if (feeDef.calcProc == "FEE_MULTIPLIER") {
						feeAmt = parseFloat(qty) * feeDef.formula;
						if (feeAmt > 0) {
							editAppSpecific("EstFee " + qtyField, "" + feeAmt);
							totalFee += feeAmt;
						}
					}
				}
			}
		}
		editAppSpecific("Estimated Fee - Total", "" + totalFee);
	}
}