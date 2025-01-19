<?php

namespace App\Enums;

enum PermissionEnum: string
{
    case ManageFeatures = 'manage_features';
	case ManageUsers = 'manage_users';
	case ManageGallery = 'manage_gallery';
	case ManageQuestionTypes = 'manage_question_types';
	case ManageQuestions = 'manage_questions';
	case ManageExamCategories = 'manage_exam_categories';
	case ManageExamTypes = 'manage_exam_types';
	case ManageExams = 'manage_exams';
}
