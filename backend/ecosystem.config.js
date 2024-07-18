module.exports = {
    apps: [
      {
        name: 'django-app',
        script: 'waitress-serve',
        args: '--port=8000 djnagobackend.wsgi:application',
        interpreter: 'python',
        cwd: 'C:/Users/varch/Desktop/Final IIT_BHU internship/IIT_BHU_Research/backend',
        env: {
          PYTHONUNBUFFERED: '1',
          DJANGO_SETTINGS_MODULE: 'djnagobackend.settings',
          // Add other environment variables if needed
        },
      },
    ],
  };
  