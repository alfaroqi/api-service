<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
                // use HasFactory;
                
    protected $table = 'courses';

    protected $guarded = [
        'id'
    ];

    public function mentror() {
        return $this->belongsTo('App\Mentor');
    }

    public function chapters() {
        return $this->hasMany('App\Chapter')->orderBy('id', 'ASC');
    }

    public function images() {
        return $this->hasMany('App\ImageCourse')->orderBy('id', 'ASC');
    }

}
