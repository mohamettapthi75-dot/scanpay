import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2500),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.4, curve: Curves.easeIn),
      ),
    );

    _scaleAnimation = Tween<double>(begin: 0.85, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.6, curve: Curves.fastOutSlowIn),
      ),
    );

    // Fade out and navigate away
    _controller.forward().then((_) {
      // Future.delayed(const Duration(milliseconds: 500), () {
      //   Navigator.of(context).pushReplacementNamed('/home');
      // });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Elegant background color matching modern fintech (Deep Slate/Navy or crisp White)
    // Golis uses Green. Let's use a very clean white background to make the green pop.
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FC),
      body: Center(
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            return FadeTransition(
              opacity: _fadeAnimation,
              child: ScaleTransition(
                scale: _scaleAnimation,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    // Enhanced Logo Presentation
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(28),
                        boxShadow: [
                          BoxShadow(
                            color: const Color(0xFF10B981).withOpacity(0.15),
                            blurRadius: 40,
                            offset: const Offset(0, 15),
                          )
                        ],
                        border: Border.all(
                          color: const Color(0xFFE2E8F0),
                          width: 1,
                        ),
                      ),
                      child: Center(
                        child: Text(
                          'G',
                          style: TextStyle(
                            fontSize: 54,
                            fontWeight: FontWeight.w900,
                            color: const Color(0xFF10B981), // Golis Green
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 32),
                    
                    // Brand Typography
                    Text(
                      'ScanPay',
                      style: const TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.w800,
                        letterSpacing: -1.0,
                        color: Color(0xFF0F172A),
                      ),
                    ),
                    const SizedBox(height: 8),
                    
                    // Secure / Modern tag
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.lock_outline_rounded,
                          size: 14,
                          color: const Color(0xFF10B981),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          'SECURED BY GOLIS SAHAL',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 2.0,
                            color: const Color(0xFF64748B),
                          ),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 64),
                    
                    // Premium Spinner / Loading Indicator
                    SizedBox(
                      width: 44,
                      height: 44,
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          CircularProgressIndicator(
                            valueColor: AlwaysStoppedAnimation<Color>(
                              const Color(0xFF10B981),
                            ),
                            strokeWidth: 3.0,
                          ),
                          Container(
                            width: 12,
                            height: 12,
                            decoration: BoxDecoration(
                              color: const Color(0xFF10B981).withOpacity(0.2),
                              shape: BoxShape.circle,
                            ),
                          )
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
