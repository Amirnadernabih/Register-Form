document.addEventListener("DOMContentLoaded", function() {
    const stepAccountType = document.getElementById('accountTypeStep');
    const stepUserRegistration = document.getElementById('userRegistrationStep');
    const companyFormSteps = [
        document.getElementById('companyStep1'),
        document.getElementById('companyStep2'),
        document.getElementById('companyStep3'),
        document.getElementById('companyStep4')
    ];
    const progressContainer = document.getElementById('progressContainer');
    const progressDots = document.querySelectorAll('.progress-dot');
    const btnSelectAccountType = document.getElementById('btn-accountType');
    const buttonsNext = document.querySelectorAll(".btn-next");
    const buttonsPrevious = document.querySelectorAll(".btn-previous");
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
        updateProgressContainerVisibility();
    }

    function updateProgressContainerVisibility() {
        if (stepAccountType.classList.contains('form-step-active') || stepUserRegistration.classList.contains('form-step-active')) {
            progressContainer.classList.add('d-none');
        } else {
            progressContainer.classList.remove('d-none');
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
            currentStepIndex = -1; // Set index for personal registration
            updateProgressContainerVisibility();
        } else {
            currentStepIndex = 0; // Reset index for company registration
            companyFormSteps[currentStepIndex].classList.add('form-step-active');
            updateProgressContainerVisibility();
            updateProgressDots();
        }
    });

    buttonsNext.forEach(button => {
        button.addEventListener("click", () => {
            const isPersonalRegistration = stepUserRegistration.classList.contains('form-step-active');
            if (isPersonalRegistration) {
                stepUserRegistration.classList.remove('form-step-active');
                companyFormSteps[0].classList.add('form-step-active'); // Start at first company step
                currentStepIndex = 0; // Set index to first company step
                updateProgressContainerVisibility();
                updateProgressDots();
                return;
            }
            if (currentStepIndex < companyFormSteps.length - 1) {
                if (currentStepIndex === 2 && selectedPlan.title === "") {
                    alert("Please select a plan before proceeding.");
                    return;
                }
                companyFormSteps[currentStepIndex].classList.remove('form-step-active');
                currentStepIndex++;
                companyFormSteps[currentStepIndex].classList.add('form-step-active');
                updateProgressDots();
                updateProgressContainerVisibility();
                if (currentStepIndex === companyFormSteps.length - 1) {
                    updatePlanOverview();
                }
            }
        });
    });

    buttonsPrevious.forEach(button => {
        button.addEventListener("click", () => {
            const isPersonalRegistration = stepUserRegistration.classList.contains('form-step-active');
            if (isPersonalRegistration) {
                stepUserRegistration.classList.remove('form-step-active');
                stepAccountType.classList.add('form-step-active');
                currentStepIndex = -1; // Set index to -1 for account type
                updateProgressContainerVisibility();
                return;
            }
            if (currentStepIndex > 0) {
                companyFormSteps[currentStepIndex].classList.remove('form-step-active');
                currentStepIndex--;
                companyFormSteps[currentStepIndex].classList.add('form-step-active');
                updateProgressDots();
                updateProgressContainerVisibility();
            } else {
                companyFormSteps[currentStepIndex].classList.remove('form-step-active');
                stepAccountType.classList.add('form-step-active');
                currentStepIndex = -1; // Set index to -1 for account type
                updateProgressContainerVisibility();
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

    updateProgressContainerVisibility();
});
