const Patient = require("../models/Patient");

/* ─────────────────────────────────────────────
   POST /api/patients  — create a new record
───────────────────────────────────────────── */
exports.createPatient = async (req, res) => {
    try {
        const { name, age, gender, mobile, ast, astLimit, platelets } = req.body;

        // ── Validate all required fields are present ──────────
        const missing = [];
        if (!name)      missing.push("name");
        if (!age)       missing.push("age");
        if (!gender)    missing.push("gender");
        if (!mobile)    missing.push("mobile (Patient ID)");
        if (!ast)       missing.push("ast");
        if (!astLimit)  missing.push("astLimit");
        if (!platelets) missing.push("platelets");

        if (missing.length) {
            return res.status(400).json({
                error: `Missing required fields: ${missing.join(", ")}`,
            });
        }

        // ── Numeric sanity checks ──────────────────────────────
        const astNum      = parseFloat(ast);
        const astLimitNum = parseFloat(astLimit);
        const plateletsNum = parseFloat(platelets);

        if (astLimitNum === 0) {
            return res.status(400).json({ error: "AST Upper Limit cannot be zero." });
        }

        if (plateletsNum === 0) {
            return res.status(400).json({ error: "Platelet count cannot be zero." });
        }

        // ── Calculate APRI using the LAB'S actual ULN ─────────
        // ✅ Fixed: was hardcoded to 40 — now uses the submitted astLimit
        const apri = ((astNum / astLimitNum) / plateletsNum) * 100;

        // ── Interpretation (matches frontend labels exactly) ───
        let interpretation;
        if (apri < 0.5) {
            interpretation = "Minimal or No Fibrosis";
        } else if (apri <= 1.5) {
            interpretation = "Moderate Fibrosis";
        } else {
            interpretation = "Severe Fibrosis / Cirrhosis";
        }

        // ── Save to MongoDB ────────────────────────────────────
        const patient = await Patient.create({
            name,
            age:        parseInt(age),
            gender,
            mobile,
            ast:        astNum,
            astLimit:   astLimitNum,
            platelets:  plateletsNum,
            apri:       parseFloat(apri.toFixed(4)),
            interpretation,
        });

        console.log(`[NEW PATIENT] ${patient.name} | APRI: ${patient.apri} | ${patient.interpretation}`);

        return res.status(201).json({
            success: true,
            data: patient,
        });

    } catch (err) {
        // Mongoose validation errors give a helpful message
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ error: messages.join(". ") });
        }

        console.error("[createPatient error]", err);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
};

/* ─────────────────────────────────────────────
   GET /api/patients  — fetch all records
───────────────────────────────────────────── */
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find()
            .sort({ createdAt: -1 })
            .select("-__v");            // hide internal Mongoose field

        return res.json({
            success: true,
            count: patients.length,
            data: patients,
        });

    } catch (err) {
        console.error("[getPatients error]", err);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
};

/* ─────────────────────────────────────────────
   GET /api/patients/:id  — fetch single record
───────────────────────────────────────────── */
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).select("-__v");

        if (!patient) {
            return res.status(404).json({ error: "Patient not found." });
        }

        return res.json({ success: true, data: patient });

    } catch (err) {
        console.error("[getPatientById error]", err);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
};