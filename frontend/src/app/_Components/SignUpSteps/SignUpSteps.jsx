export default function SignUpSteps({ activeStep = 1 }) {
  const steps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Career" },
    { number: 3, label: "Skills" },
  ];

  return (
    <div className="mt-7 hidden sm:flex items-start justify-between">
      {steps.map((step, index) => {
        const isActive = activeStep === step.number;
        const isCompleted = activeStep > step.number;

        return (
          <div key={step.number} className="flex flex-1 items-start">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold shadow-sm ${
                  isActive || isCompleted
                    ? "bg-gradient-to-br from-blue-500 to-violet-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {isCompleted ? "✓" : step.number}
              </div>

              <span
                className={`mt-2 text-xs font-semibold ${
                  isActive || isCompleted
                    ? "text-violet-600"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`mt-4 h-px flex-1 ${
                  activeStep > step.number ? "bg-violet-500" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}