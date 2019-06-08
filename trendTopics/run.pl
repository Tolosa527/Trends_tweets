#!/usr/bin/perl
use strict;
use warnings;
use Data::Dumper;
use JSON;

my $posts = `node main.js`;

#$posts =~ s/^\'+/"/;
my $perl_scalar = JSON->new->utf8->decode($posts);

#if($perl_scalar->{status} eq "true"){
	print "Nombre: ".$perl_scalar->{name}."\n";
	print "Tweet: ".$perl_scalar->{text}."\n";
# }else{
# 	print "Error occurs.\n"
# }

1;
