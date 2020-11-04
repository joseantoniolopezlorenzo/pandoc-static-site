#!/bin/bash
#
#Ejemplo #2: Script que muestra como asignar valores a variables en forma interactiva por el
#            usuario, uso de la funcion read.
#Author: Gonzalo Silverio  -> gonzasilve@gmail.com
#Archivo: script2.sh
#pedir el dato al usuario
echo 'Introduzca un  valor para la variable var1:'
#leer el dato del teclado y guardarlo en la variable de usuario var1
read var1
#Mostrar el valor de la variable de usuario
echo $var1
echo
#Avisar al usuario que se ha terminado de ejecutar el script 
echo ---------Fin del script.-----