
// ======================= Forgot Password =======================

export const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    // Check Email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Find User
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // OTP Expiry
    const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP
    user.resetOtp = otp;
    user.resetOtpExpire = otpExpire;

    await user.save();

    // Send OTP Email
    await sendVerificationOTP(email, user.name, otp);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully.",
    });
  } catch (error) {
    console.log("Forgot Password Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.publicMessage || "Internal Server Error",
    });
  }
};

// ======================= Reset Password =======================

export const resetPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const otp = req.body.otp?.trim();
    const newPassword = req.body.newPassword?.trim();

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required.",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (!user.resetOtpExpire || user.resetOtpExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Reset Password Successfully",
    });
  } catch (error) {
    console.log("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
