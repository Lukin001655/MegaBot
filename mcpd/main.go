// main.go - Главный файл бекенда для MCP сервера
package main

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
)