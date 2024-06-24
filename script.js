document.addEventListener("DOMContentLoaded", function() {
    const stepAccountType = document.getElementById('accountTypeStep');
    const stepUserRegistration = document.getElementById('userRegistrationStep');
    const companyFormSteps = [
        document.getElementById('companyStep1'),
        document.getElementById('companyStep2'),
        document.getElementById('companyStep3'),
        document.getElementById('companyStep4')
    ];
    const progressContainer = document.getElementById('progressContainer'); // Updated to progressContainer
    const progressDots = document.querySelectorAll('.progress-dot');
    const btnSelectAccountType = document.getElementById('btn-accountType');
    const buttonsNext = document.querySelectorAll(".btn-next");
    const btnSelectPlan = document.querySelectorAll('.btn-select-plan');

    let currentStepIndex = 0;
    let selectedPlan = {
        title: "",
        details: ""
    };

    function showStep(stepIndex) {
        const allSteps = document.querySelectorAll('.form-step');
        allSteps.forEach((step, index) => {
            step.classList.toggle('form-step-active', index === stepIndex);
        });
        currentStepIndex = stepIndex;
        updateProgressDots();
        updateProgressContainerVisibility(); // Call function to update progress dots visibility
    }

    function updateProgressContainerVisibility() {
        // Check if current step is either accountTypeStep or userRegistrationStep
        if (stepAccountType.classList.contains('form-step-active') || stepUserRegistration.classList.contains('form-step-active')) {
            progressContainer.classList.add('d-none'); // Hide progress dots
        } else {
            progressContainer.classList.remove('d-none'); // Show progress dots
        }
    }

    function updateProgressDots() {
        progressDots.forEach((dot, index) => {
            dot.classList.remove('active');
            dot.classList.remove('completed');
            if (index < currentStepIndex) {
                dot.classList.add('completed');
            }
            if (index === currentStepIndex) {
                dot.classList.add('active');
            }
        });
    }

    btnSelectAccountType.addEventListener('click', () => {
        const selectedAccountType = document.querySelector('input[name="accountType"]:checked').value;
        stepAccountType.classList.remove('form-step-active');
        if (selectedAccountType === 'personal') {
            stepUserRegistration.classList.add('form-step-active');
            currentStepIndex = 0;
            updateProgressContainerVisibility(); // Update progress dots visibility
        } else {
            companyFormSteps[currentStepIndex].classList.add('form-step-active');
            updateProgressContainerVisibility(); // Update progress dots visibility
            updateProgressDots();
        }
    });

    buttonsNext.forEach(button => {
        button.addEventListener("click", () => {
            if (currentStepIndex < companyFormSteps.length - 1) {
                // Validate plan selection before proceeding
                if (currentStepIndex === 3 && selectedPlan.title === "") {
                    alert("Please select a plan before proceeding.");
                    return;
                }
                const currentStep = companyFormSteps[currentStepIndex];
                if (currentStep) {
                    currentStep.classList.remove('form-step-active');
                }
                currentStepIndex++;
                const nextStep = companyFormSteps[currentStepIndex];
                if (nextStep) {
                    nextStep.classList.add('form-step-active');
                }
                updateProgressDots();
                updateProgressContainerVisibility(); // Update progress dots visibility
                if (currentStepIndex === companyFormSteps.length - 1) {
                    updatePlanOverview();
                }
            }
        });
    });

    btnSelectPlan.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('active');
            });
            button.closest('.card').classList.add('active');
            selectedPlan.title = button.closest('.card-body').querySelector('.card-title').innerText;
            selectedPlan.details = button.closest('.card-body').querySelector('.card-text').innerText;
            updatePlanOverview();
        });
    });

    function updatePlanOverview() {
        document.getElementById('planTitle').innerText = selectedPlan.title;
        document.getElementById('planDetails').innerText = selectedPlan.details;
    }

    updateProgressContainerVisibility(); // Initial call to hide progress dots for personal registration
});
